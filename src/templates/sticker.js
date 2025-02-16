const { default: axios } = require('axios');
const sharp = require('sharp');
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
  const user = payload?.contacts[0]?.wa_id;
  const mediaInfo = await getMedia(payload?.messages[0]?.image?.id);
  console.log('media info', mediaInfo);
  const mediaBuffer = await getMediaBuffer(mediaInfo.url);
  const localBuffer = Buffer.from(mediaBuffer, 'base64');
  const stickerWebp = await sharp(localBuffer).resize(512, 512).toFile(mediaInfo.id + '.webp');
  console.log('writing local');
  const destDir = './media/' + user;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
  const filePath = path.join(destDir, mediaInfo.id + '.webp');
  fs.writeFile(filePath, stickerWebp, (err) => console.error(err));

  // const extension = mediaInfo.mime_type.split('/')[1];
  // const filename = mediaInfo.id + '.' + extension;
  // const filePath = path.join(destDir, filename);
  // fs.writeFile(filePath, localBuffer, (err) => console.error(err));
  return;

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

module.exports = {
  stickerTutorial,
  staticSticker,
};
