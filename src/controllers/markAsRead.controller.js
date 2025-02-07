const { default: axios } = require('axios');
// const { jsonHeaders } = require('../utils');
const { VERSION, GRAPH_API_TOKEN } = process.env;

const markAsRead = async ({ contacts, messages }) => {
  // const myHeaders = jsonHeaders(contacts[0]?.wa_id);
  console.log('aqui:', contacts[0]);
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${contacts[0]?.wa_id}/messages`,
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
    .catch((err) => console.error('error reading', err));
};

module.exports = {
  markAsRead,
};
