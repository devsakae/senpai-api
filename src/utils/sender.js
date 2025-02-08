const { default: axios } = require('axios');
const { jsonHeaders } = require(".");

const dispatchAxios = async (data) => {
  return await axios({
    jsonHeaders,
    data: data,
  })
    .then((response) => console.log('dispatch/ok', response))
    .catch((error) => console.error('dispatch/error', error));
};


module.exports = {
  dispatchAxios,
}