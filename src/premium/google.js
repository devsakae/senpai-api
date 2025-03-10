import axios from "axios";
import {
  search,
  OrganicResult,
  DictionaryResult,
} from "google-sr";
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

const googleThis = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const searchStr = payload?.messages[0]?.text?.body.split(".google ")[1];
  const queryResult = await search({
    query: searchStr,
    resultTypes: [OrganicResult, DictionaryResult],
    requestConfig: {
      params: {
        safe: "active",
        gl: "br",
      },
    },
  });
  const result = queryResult[Math.floor(Math.random() * 3)];
  const response = `${result.description} (${result.title} - ${result.link})`;
  await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: payload?.contacts[0]?.wa_id,
        type: 'text',
        text: {
          preview_url: true,
          body: response,
        },
      },
    })
      .then((response) => {
        if (response.status !== 200 || response.statusText !== 'OK')
          throw new Error({ response: 'Erro ao enviar' });
      })
      .catch((err) => console.error(err.code));
}

module.exports = {
  googleThis
}