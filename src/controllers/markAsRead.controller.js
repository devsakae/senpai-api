const { default: axios } = require('axios');
const { jsonHeaders } = require('../utils');

const markAsRead = async ({ contacts, messages }) => {
  const myHeaders = jsonHeaders(contacts[0]?.wa_id);
  await axios({
    myHeaders,
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
