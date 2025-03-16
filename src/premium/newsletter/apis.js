const { default: axios } = require('axios');
const { DOTY_APIKEY } = process.env;

const getRapidApi = async (host) => {
  
}

const getDotyApi = async () => {
  return await axios({
    method: 'GET',
    url: 'https://www.daysoftheyear.com/api/v1/today/?timezone_offset=-3',
    headers: {
      'X-Api-Key': DOTY_APIKEY
    },
  }).then((res) => {
    if (res.data.code === 200) return res.data.data;
    else throw new Error({ data: [] })
  }).catch((err) => {
    console.error('Erro getting DOTY', err.data || err)
    return [];
  })
}

const getWishiyApi = async () => {
  return await axios({
    method: 'POST',
    url: 'https://wishiy.com/api/today',
    data: {
      limit: 7,
      response: "json"
    }
  }).then((res) => res.data || [])
    .catch((err) => console.error(err.data || err));
}


mnodule.exports = {
  getRapidApi,
  getDotyApi,
  getWishiyApi
}