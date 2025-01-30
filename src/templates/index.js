const axios = require("axios");
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, VERSION } = process.env;

const greetFirstUser = async (data, res) => {
  const business_phone_number_id = data.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
  const payload = req.body.entry?.[0]?.changes;
  const message = payload[0]?.value?.messages?.[0];

  try {
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/${VERSION}/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: message.from,
        type: "text",
        text: {
          preview_url: false,
          body: "Bem vindo ao Senpai Bot. Estamos em construção para melhor atender!"
        }
      },
    });
  } catch (err) {
    console.error("Erro ao enviar mensagem de boas vindas!")
    console.error(err);
  } finally {
    return res.sendStatus(200);
  }
};

module.exports = {
  greetFirstUser,
}