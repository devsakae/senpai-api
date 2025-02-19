const { default: axios } = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { randomizeThis, msg_sticker } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, API_URL } = process.env;

const stickerTutorial = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
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
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: randomizeThis(msg_sticker),
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar stickerTutorial' });
    })
    .catch((err) => console.error(err.response));
};

const staticSticker = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;
  const mediaInfo = await getMedia(payload?.messages[0]?.image?.id);
  const mediaBuffer = await getMediaBuffer(mediaInfo.url);
  const localBuffer = Buffer.from(mediaBuffer, 'base64');
  const destDir = './media/' + user;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
  const filePath = path.join(destDir, mediaInfo.id + '.webp');
  await sharp(localBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(filePath);

  const stickerURL = `${API_URL}/media/${user}/${mediaInfo.id}`;
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

const getMedia = async (imageId) => {
  return await axios({
    method: 'GET',
    url: `https://graph.facebook.com/${VERSION}/${imageId}?phone_number_id=${PHONE_NUMBER_ID}`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .catch((err) => console.error('Error getting URL', err.code));
};

const getMediaBuffer = async (mediaUrl) => {
  return await axios({
    method: 'GET',
    url: mediaUrl,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    responseType: 'arraybuffer',
  })
    .then((response) => response.data)
    .catch((err) => console.error('error media buffer', err.code));
};

const sendMediaIdToUser = async (mediaId, userId) => {
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSOPM}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: 'whatsapp',
      to: userId,
      type: 'sticker',
      sticker: {
        id: mediaId,
      },
    },
  })
    .then((response) => {
      console.log('sticker sent ok!', response.data);
    })
    .catch((err) =>
      console.error('error sending sticker', err.response?.data || err),
    );
};

module.exports = {
  stickerTutorial,
  staticSticker,
};
