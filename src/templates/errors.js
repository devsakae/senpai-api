const { default: axios } = require("axios");
const { randomizeThis, msg_limitsticker } = require("./info");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const limitedStickers = async (req) => {
  const limit_message = randomizeThis(msg_limitsticker) + `\n\nVocê pode tentar novamente a partir de ${new Date((req.body?.entry[0].changes[0]?.value?.messages[0]?.timestamp * 1000) + 86400).toString()}`
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
  })
}

module.exports = {
  limitedStickers,
}