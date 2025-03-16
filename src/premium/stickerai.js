const { default: axios } = require('axios');
const { randomizeThis } = require('../templates/info')
const { RAPIDAPI_KEYS, STICKERAI_API, STICKERAI_HOST } = process.env;
const rapidkeys = RAPIDAPI_KEYS.split(",");
const styles = [40, 41, 42, 43, 44, 45];

const getStickerAi = async (tl, req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const wa_id = payload?.contact[0].wa_id;
  let prompt = payload?.messages[0]?.text?.body || 'create a random sticker';
  if (tl) {
    // prompt = await googleTranslate({ }); 
  }
  const promptResponse = await inputPrompt(prompt);

}

const inputPrompt = async (prompt) => {
  const apikey = randomizeThis(rapidkeys);
  const style = randomizeThis(styles);
  await axios({
    method: 'POST',
    url: STICKERAI_API,
    headers: {
      'x-rapidapi-key': apikey,
      'x-rapidapi-host': STICKERAI_HOST
    },
    data: {
      prompt: prompt,
      style_id: style,
      size: '1-1'
    }
  })
}

module.exports = {
  getStickerAi,
}