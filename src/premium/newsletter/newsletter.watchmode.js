const { WATCHMODE_APIKEY } = process.env;
const { default: axios } = require("axios");

const getWatchmodeApiDay = async () => {
  const today = new Date();
  const thisDate = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const thatDate = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate() + 7}`;
  const watchmodRes = await axios({
    method: "GET",
    url: `https://api.watchmode.com/v1/releases/?apiKey=${WATCHMODE_APIKEY}&start_date=${thisDate}&end_date=${thatDate}`
  }).then(res => res.data)
  .catch(err => console.error(err));
  return watchmodRes?.releases;
}

const sourceType = (type) => {
  if (type.includes("movie")) return " 🎞️"; 
  return "";
}

const srd = (date) => new Date(date).toLocaleString("pt-br", { weekday: "short", day: "numeric" }) || date;

const getWatchmodeStreaming = (source, releases) => {
  return releases.filter(r => r.source_name.startsWith(source));
}

module.exports = {
  getWatchmodeApiDay,
  getWatchmodeStreaming,
  sourceType,
  srd,
}