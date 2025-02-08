const { default: axios } = require('axios');
const { jsonHeaders } = require("./index");

const dispatchAxios = async (data) => {
  console.log('dispatch 2', jsonHeaders);
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