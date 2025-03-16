const { default: axios } = require("axios");
const { googleTranslate } = require("../../utils/googletranslate");

const getUselessFact = async () => {
  const uselessFact = await axios.request({
    method: 'GET',
    url: 'https://uselessfacts.jsph.pl/api/v2/facts/random',
  });
  if (uselessFact.length > 0) {
    const uselessFactTranslated = await googleTranslate({ source: "en", target: "pt-BR", query: uselessFact })
    return "\n\n" + uselessFactTranslated;
  }
  return "";
}

module.exports = {
  getUselessFact,
}