// const { Sticker, createSticker, StickerTypes } = require('@laxeder/wa-sticker');
const { default: axios } = require("axios");
const fs = require('fs');
const path = require('path');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

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
        body: 'Para converter uma imagem em figurinha, envie uma imagem com a legenda .sticker',
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
  if (payload.messages[0].type !== 'image') return await stickerTutorial(req);  
  console.log('Início da construção da sticker aqui');
  const imageData = await downloadImage(req.body.entry[0]?.changes[0]?.value?.messages[0]?.image?.id);
  const filePath = path.join(__dirname, 'teste.jpg');
  saveImage(imageData, filePath);
};

const downloadImage = async (imageId) => {
  const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/media/${imageId}`;
  // const url = `https://graph.facebook.com/v13.0/${phoneNumberId}/media/${imageId}`;
  const headers = {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  };

  try {
      const response = await axios.get(url, { headers, responseType: 'arraybuffer' });
      return response.data;
  } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
  }
};

const saveImage = (imageData, filePath) => {
  fs.writeFileSync(filePath, imageData);
  console.log(`Image saved to ${filePath}`);
};


module.exports = {
  stickerTutorial,
  staticSticker,
};
