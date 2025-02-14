const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;
const axios = require('axios');
const welcome_messages = [
  "Olá! Muito obrigado por entrar em contato com o Bot do Senpai pela primeira vez! 😊\n\nEu sou o seu assistente virtual favorito, sempre pronto para ajudar. Ah, e se eu demorar para responder, é porque estou treinando meu jutsu da programação! 🥋\n\nPara saber mais sobre mim, acesse: http://www.botdosenpai.com.br",
  "Oi! Agradeço muito seu primeiro contato com o Bot do Senpai! ❤️\n\nSabia que eu sou o bot mais descolado do WhatsApp? Pois é, até meu código tem estilo! 😎\n\nVisite http://www.botdosenpai.com.br para descobrir mais sobre minhas funcionalidades.",
  "E aí! Obrigado por falar com o Bot do Senpai! 🚀\n\nEu sou o bot que sempre está online, mas confesso que às vezes dou uma pausa para tomar um café virtual. ☕\n\nConfira mais detalhes no site: http://www.botdosenpai.com.br",
  "Oi, tudo bem? Fico feliz que você entrou em contato com o Bot do Senpai! 🌟\n\nEu sou o bot que nunca dorme, mas se eu demorar para responder, pode ser que eu esteja assistindo anime. 🍿\n\nAcesse http://www.botdosenpai.com.br para mais informações.",
  "Olá! Obrigado por conversar com o Bot do Senpai! 😄\n\nSabia que eu sou o único bot que sabe contar piadas de programador? Tipo: 'Por que o Java foi ao psicólogo? Porque tinha problemas de classe!' 😂\n\nNão deixe de visitar http://www.botdosenpai.com.br e conhecer tudo que posso fazer por você.",
  "Oi! Que bom que você entrou em contato com o Bot do Senpai! 💡\n\nEu sou o bot que está sempre aprendendo, mas confesso que às vezes erro só para parecer mais humano. 😅\n\nPara saber mais, acesse: http://www.botdosenpai.com.br",
  "Olá! Agradeço seu primeiro contato com o Bot do Senpai! 🌈\n\nEu sou o bot que adora ajudar, mas se eu falar algo estranho, pode culpar meu desenvolvedor! 😜\n\nVisite http://www.botdosenpai.com.br e descubra como posso te ajudar.",
  "Oi! Muito obrigado por falar com o Bot do Senpai! �\n\nSabia que eu sou o bot mais fofo do WhatsApp? Até meu código tem coração! ❤️\n\nConfira mais informações no site: http://www.botdosenpai.com.br",
  "Olá! Fico feliz que você entrou em contato com o Bot do Senpai! 🎉\n\nEu sou o bot que está sempre aqui para você, mas se eu sumir por um instante, pode ser que eu esteja atualizando meu sistema. 🛠️\n\nAcesse http://www.botdosenpai.com.br para saber mais sobre mim.",
  "Oi! Obrigado por conversar com o Bot do Senpai! 😎\n\nEu sou o bot que adora desafios, mas confesso que ainda estou aprendendo a lidar com piadas ruins. Tipo: 'Por que o bot foi para a escola? Para se tornar um bot-mestre!' 🤖\n\nVisite http://www.botdosenpai.com.br e explore tudo que posso fazer por você."
];

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
  console.log('>> usuario não existe no mongoDB:', payload?.contacts[0]?.profile?.name, '[' + payload?.contacts[0]?.wa_id + ']');
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
        body: welcome_messages[Math.floor(Math.random() * welcome_messages.length)],
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error('Erro ao enviar hello!', err.response));
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
        body: 'Acompanhe as últimas atualizações no nosso canal!\n\n‎Follow the Bot Senpai channel on WhatsApp: https://whatsapp.com/channel/0029VatyGWjFcow5imozTp2r',
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error(err.response));
};

module.exports = {
  template_manutencao,
  message_hello,
  canal,
};
