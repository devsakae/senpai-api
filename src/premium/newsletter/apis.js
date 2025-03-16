const { default: axios } = require('axios');
const { DOTY_APIKEY, RAPIDAPI_KEY, RAPIDAPI_HOST } = process.env;

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

const getNewsApi = async (topic) => {
  let response = [];
  response = await axios({
    method: 'GET',
    url: 'https://news-api14.p.rapidapi.com/v2/trendings',
    params: {
      topic: topic,
      language: "pt",
      country: "br",
      limit: 5
    },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  }).then((res) => res.data.success && res.data.data)
    .catch((err) => {
      console.error(err.data || err)
      return [];
    });
  return response || [];
}

mnodule.exports = {
  getRapidApi,
  getDotyApi,
  getWishiyApi,
  getNewsApi
}