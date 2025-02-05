const axios = require("axios");
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, VERSION } = process.env;

const greetFirstUser = async (payload) => {
  const msg = payload.body.entry[0]?.changes[0]?.value?.messages[0];
  const metadata = payload.body.entry[0]?.changes[0]?.value?.metadata;
  console.info("greeting first user with phone", metadata?.display_phone_number);

  let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    context: {
      message_id: msg?.id
    },
    to: metadata?.phone_number_id,
    type: "template",
    template: {
      name: "modo_manutencao",
      language: {
        policy: "deterministic",
        code: "pt_br",
      }
    },
  }); 
  /* let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: metadata?.phone_number_id,
    context: {
      message_id: msg?.id
    },
    type: "text",
    text: {
      preview_url: false,
      body: "Ficamos felizes que você nos escolheu! Estamos em manutenção para melhorias, estaremos disponíveis em alguns dias, agradecemos pela atenção. ♥️\n\nQue tal acompanhar as novidades direto no nosso site?\n\nhttp://www.botdosenpai.com.br"
    }
  }); */

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/${VERSION}/${metadata.phone_number_id}/messages?verify_token=${WEBHOOK_VERIFY_TOKEN}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => console.log("greeting sent!", JSON.stringify(response?.data)))
    .catch((error) => console.error("Erro!", error.code))
    .finally(() => console.log('end greeting'));

};

module.exports = {
  greetFirstUser,
};
