const axios = require("axios");
const { jsonHeaders } = require("../utils");

const template_manutencao = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const myHeaders = jsonHeaders();
  await axios({
    myHeaders,
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
  });
}

const message_hello = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const myHeaders = jsonHeaders()
  await axios({
    myHeaders,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        preview_url: true,
        body: "Ficamos felizes que você nos escolheu! Estamos em manutenção para melhorias, estaremos disponíveis em alguns dias, agradecemos pela atenção. ♥️\n\nQue tal acompanhar as novidades direto no nosso site?\n\nAcessa aí: http://www.botdosenpai.com.br"
      }
    },
  });
}

const menu = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const myHeaders = jsonHeaders(payload?.contacts[0]?.wa_id)
  await axios({
    myHeaders,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        preview_url: true,
        body: "Ficamos felizes que você nos escolheu! Estamos em manutenção para melhorias, estaremos disponíveis em alguns dias, agradecemos pela atenção. ♥️\n\nQue tal acompanhar as novidades direto no nosso site?\n\nAcessa aí: http://www.botdosenpai.com.br"
      }
    },
  });
}

module.exports = {
  template_manutencao,
  menu,
  message_hello,
};
