const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;
const axios = require('axios');
const { randomizeThis } = require('./info');
const { rootMenu } = require('./list');

const template_manutencao = async (req) => {
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
      type: 'template',
      template: {
        name: 'modo_manutencao',
        language: {
          code: 'pt_br',
        },
        components: [],
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error(err.code));
};

const message_hello = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const hello_msg = randomizeThis(message_hello) || 'Olá! Obrigado por utilizar o Bot do Senpai!\n\nAcesse nosso site em http://www.botdosenpai.com.br';
  console.log('>> Novo usuário!', payload?.contacts[0]?.profile?.name, '[' + payload?.contacts[0]?.wa_id + ']');
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
        body: hello_msg,
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'status !== 200' });
    })
    .catch((err) => console.error('Erro ao enviar hello!', err.response?.data || err))
    .finally(async () => await rootMenu(payload?.contacts[0]));
};

const canal = async (req) => {
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
        body: 'Acompanhe as últimas atualizações no nosso canal!\n\nBasta seguir Bot Senpai no WhatsApp: https://whatsapp.com/channel/0029VatyGWjFcow5imozTp2r',
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch(err => console.error(err.response?.data || err));
};

const sobre = async (req) => {
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
        body: 'Somos uma empresa Brasileira 🇧🇷 e estamos aqui para poder ajudar você a criar figurinhas de forma fácil e rápida.\n\nNossos links:\n\n- Site: http://www.botdosenpai.com.br\n- Canal do WhatsApp: https://whatsapp.com/channel/0029VatyGWjFcow5imozTp2r',
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch(err => console.error(err.response?.data || err));
}

module.exports = {
  template_manutencao,
  message_hello,
  canal,
  sobre,
};
