const { default: axios } = require('axios');
const sharp = require('sharp');
const fs = require('fs');
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
  const user = payload?.contacts[0]?.wa_id;
  console.log('getMediaURL');
  const mediaURL = await getMediaURL(payload?.messages[0]?.image?.id);
  console.log('getMediaBuffer');
  const mediaBuffer = await getMediaBuffer(mediaURL);
  console.log('localBuffer');
  const localBuffer = Buffer.from(mediaBuffer, 'base64');
  console.log('writing local');
  fs.writeFile('./teste.jpg', localBuffer, (err) => console.error(err));
  return;
  // sharp(localBuffer)
  //   .resize(512, 512)
  //   .toFile('teste.webp');

  // if (mediaURL) {
  //   console.log('downloading media from', mediaURL);
  //   const downloadedImage = await axios({
  //     method: 'GET',
  //     url: mediaURL,
  //     headers: {
  //       Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  //     },
  //     responseType: 'arraybuffer',
  //   })
  //     .then((response) => {
  //       console.log('response ok!');
  //       return response
  //     })
  //     .catch((err) => console.error('get/error!', err));

  //   const buffer = Buffer.from(downloadedImage.data, 'utf-8');
  //   sharp(buffer)
  //     .resize(512, 512)
  //     .toFile('teste.webp');

  //   console.log('starting sending sticker');
  //   await axios({
  //     method: 'POST',
  //     url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/media`,
  //     headers: {
  //       Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  //     },
  //     data: {
  //       messaging_product: 'whatsapp',
  //       file: payload?.messages[0]?.image?.id + '.webp',
  //     },
  //   })
  //     .then((response) => {
  //       console.log('response ok', response.data);
  //     })
  //     .catch((err) => console.error('error sending sticker', err.response.data.error));
  // }
};

const getMediaURL = async (imageId) => {
  return await axios({
    method: 'GET',
    url: `https://graph.facebook.com/${VERSION}/${imageId}?phone_number_id=${PHONE_NUMBER_ID}`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
  })
    .then((response) => response.data.url)
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

module.exports = {
  stickerTutorial,
  staticSticker,
};
