const { default: axios } = require("axios");
const { randomizeThis, msg_limitsticker } = require("./info");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const limitedStickers = async (req) => {
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
        body: randomizeThis(msg_limitsticker),
      },
    },
  })
}

module.exports = {
  limitedStickers,
}