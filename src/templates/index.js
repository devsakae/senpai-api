const axios = require("axios");
const { GRAPH_API_TOKEN, VERSION } = process.env;

const greetFirstUser = async (payload) => {
  const metadata = payload.body.entry?.[0].changes?.[0].value?.metadata;
  console.info("greeting first user with phone", metadata?.display_phone_number);

  let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
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

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/${VERSION}/${metadata.phone_number_id}/messages`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log("ok!", JSON.stringify(response?.data));
    })
    .catch((error) => {
      console.error("Erro!", error.code);
    });

};

module.exports = {
  greetFirstUser,
};
