const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, SUPORTE_TECNICO } =
  process.env;
const axios = require('axios');

const getPremiumSuporte = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
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
      type: 'interactive',
      interactive: {
        type: 'flow',
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: '3',
            flow_id: '1083818146763696',
            flow_cta: 'Enviar',
            mode: 'published',
            flow_token: 'feedback',
            flow_action: 'navigate',
            flow_action_payload: {
              screen: 'QUAIS_ESCOLHAS'
            }
          }
        }
      }
    },
  }).then((response) => console.log(response.data))
    .catch((err) => console.error('Erro requisitando premium suporte', err?.response?.data || err));
}

const getSuporte = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
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
        body: 'Nosso suporte técnico foi acionado e você deverá receber contato de alguém em breve 💛\n\nEnquanto isso, que tal acessar o nosso site e verificar os tutoriais lá disponíveis?\n\nhttp://www.botdosenpai.com.br',
      },
    },
  })
    .catch((err) =>
      console.error('Erro requisitando suporte', err?.response?.data || err),
    )
    .finally(() => contactAdmin({ wa_id: payload?.contacts[0]?.wa_id }));
};

const contactAdmin = async (payload) => {
  const customer_msg = `Usuário @${payload.wa_id} solicitou suporte técnico!`;
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
      to: SUPORTE_TECNICO,
      type: 'text',
      text: {
        preview_url: false,
        body: customer_msg,
      },
    },
  });
};

module.exports = {
  getPremiumSuporte,
  getSuporte,
};
