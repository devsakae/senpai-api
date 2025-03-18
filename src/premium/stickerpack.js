const sticker = require('stickerwa-search');
const { randomArr } = require("../utils/randomArr");
const { default: axios } = require('axios');
const sharp = require("sharp");
const fs = require('fs');
const path = require('path');
const imageDownloader = require("image-downloader");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, API_URL } = process.env;

const getStickerWa = async (req) => {
	const payload = req.body.entry[0]?.changes[0]?.value;
	const payloadStickerPromptOriginal = payload?.messages[0]?.text?.body.replace(".sticker ", "").trim();
	const stickerSearchStr = payloadStickerPromptOriginal.replace(" ", "+");
	
	const stickerFound = await getStickerWaPayload(stickerSearchStr) || "";
	
	if (stickerFound.length === 0) return console.error("Erro: Nenhuma sticker encontrada para o prompt", stickerSearchStr)
	
	const now = new Date().getTime();
	const user = payload.contacts[0]?.wa_id;
	const destDir = '/home/ec2-user/senpai-api/media/' + user;
	if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
	const image = await imageDownloader.image({
		url: stickerFound,
		dest: destDir
	})
	const filePath = path.join(destDir, now + '.webp');
	await sharp(image.filename)
		.resize(512, 512, {
			fit: 'contain',
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.toFile(filePath);

	const stickerURL = `${API_URL}/media/${user}/${now}`;
	await axios({
		method: 'POST',
		url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
		headers: {
			Authorization: `Bearer ${GRAPH_API_TOKEN}`,
			'Content-Type': 'application/json',
		},
		data: {
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to: user,
			type: 'sticker',
			sticker: {
				link: stickerURL,
			},
		},
	})
		.then((response) => {
			if (response.statusText !== 'OK')
				throw new Error({ message: 'Erro ao enviar sticker' });
		})
		.catch((err) => {
			console.error('error sending sticker!', err.response?.data || err);
		});
};

const getStickerWaPayload = async (payload) => {
	const response = await sticker.stickerSearch(payload);
	console.log(response);
	if (response.sticker.length === 0) return [];
	return randomArr(response.sticker);
};

module.exports = {
	getStickerWa,
};