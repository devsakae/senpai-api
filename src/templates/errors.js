const { default: axios } = require('axios');
const { randomizeThis, msg_limitsticker, msg_limitonesticker } = require('./info');
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const limitedStickers = async (req) => {
  const period = req.body?.entry[0].changes[0]?.value?.messages[0]?.timestamp * 1000 +
  86400
  const grace_period =
    '\n\nVocê pode tentar novamente a partir de: ' +
    (req.body?.entry[0]?.changes[0]?.value?.contacts[0]?.wa_id.startsWith('55')
      ? new Date(period).toLocaleString('pt-br')
      : new Date(period).toString());
  const limit_message = randomizeThis(msg_limitsticker) + grace_period;
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: req.body?.entry[0]?.changes[0]?.value?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: limit_message,
      },
    },
  });
};

const oneStickerAtTime = async (req) => {
  const error_message = randomizeThis(msg_limitonesticker);
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: req.body?.entry[0]?.changes[0]?.value?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: error_message,
      },
    },
  });
}

module.exports = {
  limitedStickers,
  oneStickerAtTime
};
