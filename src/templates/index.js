const axios = require("axios");
const { GRAPH_API_TOKEN, VERSION } = process.env;

const greetFirstUser = async (payload) => {
  const metadata = payload.body.entry?.[0].changes?.[0].value?.metadata;
  console.info("greeting first user with phone", metadata.display_phone_number);

  let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: metadata.display_phone_number,
    type: "template",
    template: {
      name: "modo_manutencao",
      language: {
        code: "pt_br",
      },
      components: [],
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
      console.log("ok!", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error("Erro!", error.code);
    });

  /* const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${GRAPH_API_TOKEN}`);

  const raw = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: metadata?.display_phone_number,
    type: "template",
    template: {
      name: "modo_manutencao",
      language: {
        code: "pt_br",
      },
      components: [],
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://graph.facebook.com/${VERSION}/${metadata?.phone_number_id}/messages`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log("sent!", result))
    .catch((error) => console.error("error!", error)); */
};

module.exports = {
  greetFirstUser,
};
