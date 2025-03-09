const { sendAdmin } = require("../utils/sender");

const flow_feedback = async (req) => {
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
        header: {
          type: 'text',
          text: '🌸 Deixe o bot ainda melhor!',
        },
        body: {
          text: 'Conta pra gente como podemos melhorar e tornar tudo mais incrível para você.',
        },
        footer: {
          text: '💖 Sua sugestão faz toda a diferença!',
        },
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: '3',
            flow_id: '1083818146763696',
            flow_cta: 'Abrir Questionário',
            mode: 'published',
            flow_token: 'questionario',
            flow_action: 'navigate',
            flow_action_payload: {
              screen: 'QUAIS_ESCOLHAS',
            },
          },
        },
      },
    },
  })
    .then((response) => console.log(response.data))
    .catch((err) =>
      console.error(
        'Erro requisitando premium suporte',
        err?.response?.data || err,
      ),
    );
}

const getFeedbackResponse = async (req) => {
  const payload = JSON.parse(req.body.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.nfm_reply?.response_json);
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  let response = 'Flow *' + payload?.flow_token + '* enviado por ' + contact.profile.name + ' (' + contact.wa_id + '):\n\n';
  Object.entries(payload).forEach((k) => response = response + '\n- ' + k[0] + ': ' + k[1]);
  console.log(response);
  await sendAdmin(response);
}

module.exports = {
  flow_feedback,
  getFeedbackResponse,
}