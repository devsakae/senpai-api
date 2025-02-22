const { default: axios } = require('axios');
const { randomizeThis, msg_premium_wannabe } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

const getPremiumNow = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = payload?.contacts || payload?.contacts[0];
  if (!contact) return;
  const premium_body = randomizeThis(msg_premium_wannabe)
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
      to: contact.wa_id,
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: "text",
          text: "Um bot completo pra você."
        },
        body: {
          text: premium_body,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'getpremium',
                title: 'Quero ser Premium!',
              },
            }
          ],
        },
      },
    },
  });
};

module.exports = {
  getPremiumNow,
};
