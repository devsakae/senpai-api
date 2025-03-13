const { default: axios } = require('axios');
const { GOOGLE_TRANSLATE_APIKEY } = process.env;

const googleTranslate = async (params) => {
  return await axios.get('https://translation.googleapis.com/language/translate/v2', {
    params: {
      key: GOOGLE_TRANSLATE_APIKEY,
      source: params.source,
      target: params.target,
      q: params.query,
    }
  }).then((res) => res.data?.data?.translations[0]?.translatedText)
    .catch((err) => err.data);
}

module.exports = {
  googleTranslate,
}