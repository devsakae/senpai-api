const axios = require('axios');
const { GRAPH_API_TOKEN, VERSION } = process.env;

const greetFirstUser = async (data) => {
  const metadata = data.body.entry?.[0].changes?.[0].value?.metadata;
  console.info('greeting first user with phone', metadata?.display_phone_number);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${GRAPH_API_TOKEN}`);

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
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    `https://graph.facebook.com/${VERSION}/${metadata?.phone_number_id}/messages`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log("sent!", result))
    .catch((error) => console.error("error!", error));

  /*   try {
    await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${metadata?.phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: metadata?.display_phone_number,
        type: 'template',
        template: {
          name: 'modo_manutencao',
          language: {
            code: 'pt_br',
          },
          components: [
            {
              type: 'header',
              parameters: [],
            },
          ],
        },
      },
    });
  } catch (err) {
    console.error('Erro ao enviar mensagem de boas vindas!');
    console.error(err.code);
  } */
};

module.exports = {
  greetFirstUser,
};
