const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;
const { default: axios } = require('axios');
const { jsonHeaders } = require('./index');

const dispatchAxios = async (data) => {
  console.log('dispatch 2', jsonHeaders);
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: data,
  })
    .then((response) => console.log('dispatch/ok', response))
    .catch((error) => console.error('dispatch/error', error));
};

module.exports = {
  dispatchAxios,
};
