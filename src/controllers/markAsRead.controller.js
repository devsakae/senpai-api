const { default: axios } = require('axios');
// const { jsonHeaders } = require('../utils');
const { VERSION, GRAPH_API_TOKEN } = process.env;

const markAsRead = async ({ contacts, messages }) => {
  console.log('contact id:', contacts[0].wa_id);
  console.log('contact/message id:', messages[0].from);
  console.log('message id:', messages[0].id);
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${messages[0].from}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messages[0]?.id,
    },
  })
    .then((response) => console.log('reading msg', response.data))
    .catch((err) => console.error('error reading', err.code));
};

module.exports = {
  markAsRead,
};
