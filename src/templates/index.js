const axios = require('axios');
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, VERSION } = process.env;

const greetFirstUser = async (data) => {
  const metadata = data.body.entry?.[0].changes?.[0].value?.metadata;
  try {
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
  }
};

module.exports = {
  greetFirstUser,
};
