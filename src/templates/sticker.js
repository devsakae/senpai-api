const { default: axios } = require('axios');
const sharp = require('sharp');
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
  console.log('solicitando media URL');
  const media = await getMediaURL(payload?.messages[0]?.image?.id);
  if (media) {
    console.log('downloading media from', media.url);
    const response = await axios({
      method: 'GET',
      url: `https://graph.facebook.com/${VERSION}/${media.url}`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      responseType: 'arraybuffer',
    })
      .then((response) => {
        console.log('get/response!', response);
        return response;
      })
      .catch((err) => console.error('get/error!', err));
    const buffer = Buffer.from(response.data, 'utf-8');
    const sticker = sharp(buffer)
      .resize(512, 512)
      .toFile(payload?.messages[0]?.image?.id + '.webp', (err, info) => {});
    console.log('starting sending sticker');
    await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/media`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: 'whatsapp',
        file: payload?.messages[0]?.image?.id + '.webp',
      },
    })
      .then((response) => {
        console.log('response ok', response.data);
      })
      .catch((err) => console.error('error sending sticker', err));
  }
};

const getMediaURL = async (imageId) => {
  return await axios({
    method: 'GET',
    url: `https://graph.facebook.com/${VERSION}/${imageId}?phone_number_id=${PHONE_NUMBER_ID}`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
  })
    .then((response) => {
      if (response.statusText === 'OK') {
        console.log('response ok!');
        return response.data;
      } else throw new Error({ status: 500 });
    })
    .catch((err) => console.error('Error downloading image', err));
};

module.exports = {
  stickerTutorial,
  staticSticker,
};
