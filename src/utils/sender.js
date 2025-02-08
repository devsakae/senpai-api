const { default: axios } = require('axios');
const { jsonHeaders } = require(".");

const dispatchAxios = async (data) => {
  return await axios({
    jsonHeaders,
    data: data,
  })
    .then((response) => response)
    .catch((error) => error);
};


module.exports = {
  dispatchAxios,
}