const { WATCHMODE_APIKEY } = process.env;
const { default: axios } = require("axios");

const getWatchmodeApiDay = async () => {
  const today = new Date();
  const thisDate = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const watchmodRes = await axios({
    method: "GET",
    url: `https://api.watchmode.com/v1/releases/?apiKey=${WATCHMODE_APIKEY}&start_date=${thisDate}&end_date=${thisDate}`
  }).then(res => res.data)
  .catch(err => console.error(err));
  return watchmodRes?.releases;
}

const sourceType = (type) => {
  if (type.includes("movie")) return " 🎞️\n"; 
  return "\n";
}

const getWatchmodeStreaming = (source, releases) => {
  let response = source + "\n";
  const releasesOfSource = releases.filter(r => r.source_name.startsWith(source));
  releasesOfSource.forEach(ros => response += "▪️ " + ros.title + sourceType(ros.type))
  return response;
}

module.exports = {
  getWatchmodeApiDay,
  getWatchmodeStreaming
}