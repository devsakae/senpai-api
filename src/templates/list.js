const { default: axios } = require('axios');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;
// const { dispatchAxios } = require("../utils/sender");

const rootMenu = async (contact) => {
  // let data = {
  //   type: 'button',
  //   body: {
  //     text: `Olá, *${contact.profile.name}*, como posso ajudar você hoje? Somos um Bot gratuito disponível 24 horas para você aproveitar a qualquer momento! Se tiver dúvidas de como usar o Senpai Bot, selecione uma das opções abaixo ou acesse nosso site para mais informações: http://www.botdosenpai.com.br`,
  //   },
  //   action: {
  //     buttons: [
  //       {
  //         type: 'reply',
  //         reply: {
  //           id: '.canal',
  //           title: '.canal (Canal de atualizações ee descontos)',
  //         },
  //       },
  //       {
  //         type: 'reply',
  //         reply: {
  //           id: '.suporte',
  //           title: '.suporte (Falar com um atendente)',
  //         },
  //       },
  //       {
  //         type: 'reply',
  //         reply: {
  //           id: '.sobre',
  //           title: '.sobre (Conheça mais sobre nós)',
  //         },
  //       },
  //     ],
  //   },
  // };
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
      to: contact.wa_id,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: `Olá, *${contact.profile.name}*, como posso ajudar você hoje? Somos um Bot gratuito disponível 24 horas para você aproveitar a qualquer momento! Se tiver dúvidas de como usar o Senpai Bot, selecione uma das opções abaixo ou acesse nosso site para mais informações: http://www.botdosenpai.com.br`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'reply001',
                title: '.canal (Canal de atualizações ee descontos)',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'reply002',
                title: '.suporte (Falar com um atendente)',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'reply003',
                title: '.sobre (Quem somos)',
              },
            },
          ],
        },
      },
    },
  })
    .then((response) => console.log('dispatch/ok', response))
    .catch(({ response }) => console.error('dispatch/error', response.error));
};

const replyMessage = async () => {
  let data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: contact.wa_id,
    context: {
      message_id: payload.messages[0].id,
    },
    type: 'interactive',
    interactive: {
      type: 'list',
      header: {
        type: 'text',
        text: '<HEADER_TEXT>',
      },
      body: {
        text: '<BODY_TEXT>',
      },
      footer: {
        text: 'Acesse nosso site http://www.botdosenpai.com.br',
      },
      action: {
        button: '<BUTTON_TEXT>',
        sections: [
          {
            title: '<LIST_SECTION_1_TITLE>',
            rows: [
              {
                id: '<LIST_SECTION_1_ROW_1_ID>',
                title: '<SECTION_1_ROW_1_TITLE>',
                description: '<SECTION_1_ROW_1_DESC>',
              },
              {
                id: '<LIST_SECTION_1_ROW_2_ID>',
                title: '<SECTION_1_ROW_2_TITLE>',
                description: '<SECTION_1_ROW_2_DESC>',
              },
            ],
          },
          {
            title: '<LIST_SECTION_2_TITLE>',
            rows: [
              {
                id: '<LIST_SECTION_2_ROW_1_ID>',
                title: '<SECTION_2_ROW_1_TITLE>',
                description: '<SECTION_2_ROW_1_DESC>',
              },
              {
                id: '<LIST_SECTION_2_ROW_2_ID>',
                title: '<SECTION_2_ROW_2_TITLE>',
                description: '<SECTION_2_ROW_2_DESC>',
              },
            ],
          },
        ],
      },
    },
  };
};

module.exports = {
  rootMenu,
  replyMessage,
};

/* ✎ Reconhece qualquer mensagem digitada e logo em seguida enviar o menu. *Funcionar somente 1 vez e não enviar mais o menu novamente.*

Olá! @user como posso ajudar você hoje? Selecione uma das opções abaixo:

1️⃣ Fazer figurinhas estáticas e animadas automáticas

Resposta ao cliente ╰┈➤ ⌗ Primeiro, você precisa enviar uma imagem ou GIF/VIDEO para a figurinha.
─────────────────────────၄၃
2️⃣ .suporte (Falar com um atendente)

Resposta ao cliente ╰┈➤ ⌗ Clique aqui [link zap] e envie uma mensagem com a sua duvida!
─────────────────────────၄၃
3️⃣ .canal (Canal de descontos e atualizações)

Resposta ao cliente ╰┈➤ ⌗ Há algo novo toda semana, não esqueça de nos seguir! Clique [link do canal] e fique atento.
─────────────────────────၄၃
4️⃣ .grupo (Faça parte da nossa comunidade)

Resposta ao cliente  ╰┈➤ ⌗ Para garantir que nosso grupo seja um espaço agradável e produtivo para todos, pedimos que leiam atentamente as regras! [link do grupo]


🕊️ Lembre-se de usar alguns de nossos comandos. */
