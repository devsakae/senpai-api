const { default: axios } = require("axios");
const { sendAdmin } = require("../utils/sender");
const { senpaiMongoDb } = require("../utils/connections");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

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
  await sendAdmin(response);
}

const flow_premium_activation = async (req) => {
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
          text: 'Agradecemos pela sua compra!',
        },
        body: {
          text: 'Confirme os detalhes da sua assinatura para concluir a configuração do seu Plano!',
        },
        action: {
          name: 'flow',
          parameters: {
            flow_message_version: '3',
            flow_id: '649075014193636',
            flow_cta: 'Informar Código de Compra',
            mode: 'published',
            flow_token: 'premiumactivation',
            flow_action: 'navigate',
            flow_action_payload: {
              screen: 'PREMIUMACTIVATION',
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

const getPremiumActivationPayload = async (req) => {
  const payload = JSON.parse(req.body.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.nfm_reply?.response_json);
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  let response = 'Flow *' + payload?.flow_token + '* enviado por ' + contact.profile.name + ' (' + contact.wa_id + '):\n\n';
  Object.entries(payload).forEach((k) => response = response + '\n- ' + k[0] + ': ' + k[1]);
  await sendAdmin(response);
  if (payload?.receber_newsletter.startsWith('0')) {
    await senpaiMongoDb.collection('customers').findOneAndUpdate(
      { wa_id: contact.wa_id },
      { 
        $set: {
          "subscription.newsletter": true
        }
      }
    )
  }
  return console.info("*** Premium activation!", response);
}

module.exports = {
  flow_feedback,
  getFeedbackResponse,
  flow_premium_activation,
  getPremiumActivationPayload,
}