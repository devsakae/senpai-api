const { default: axios } = require("axios");
const { googleTranslate } = require("../../utils/googletranslate");

const getAdviceSlip = async () => {
  let adviceSlipRes = "";
  let adviceSlipResTranslated = "";

  adviceSlipRes = await axios({
    method: "GET",
    url: "https://api.adviceslip.com/advice"
  }).then(res => res?.data?.advice || "")
    .catch(err => console.error(err));

  if (adviceSlipRes) adviceSlipResTranslated = await googleTranslate({ query: adviceSlipRes, source: "en", target: "pt-br" }) || "";
  
  return adviceSlipResTranslated
}

module.exports = {
  getAdviceSlip
}