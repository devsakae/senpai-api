const { default: axios } = require('axios');
const { jsonHeaders } = require('../utils');
// const { jsonHeaders } = require('../utils');

const markAsRead = async ({ messages }) => {
  const myHeaders = jsonHeaders();
  await axios({
    // method: 'POST',
    // url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    // headers: {
    //   Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    //   'Content-Type': 'application/json',
    // },
    myHeaders,
    data: {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messages[0]?.id,
    },
  })
    .then((response) => console.log('reading incoming msg', response.data))
    .catch((err) => console.error('error reading msg..', err.code));
};

module.exports = {
  markAsRead,
};
