const { default: axios } = require('axios');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;
// const { dispatchAxios } = require("../utils/sender");

const rootMenu = async (contact) => {
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
          text: `Olá, *${contact.profile.name}*, como posso ajudar você hoje?\n\nSomos um Bot gratuito disponível 24 horas para você aproveitar a qualquer momento!\n\nSe é sua primeira vez usando o Senpai Bot, comece selecionando uma das opções abaixo:\n\n- *.sticker*: Ensinamos você a criar sua primeira figurinha :)\n- *.canal*: Acesse o nosso canal no WhatsApp e fique sabendo de dicas, cupons de desconto e sorteios!\n- *.suporte*: Acionamos o nosso suporte técnico para entrar em contato com você.\n- *.sobre*: Saiba quem somos.\n\nEstamos em fase BETA, em breve mais novidades!`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'reply001',
                title: '.sticker',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'reply002',
                title: '.suporte',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'reply003',
                title: '.sobre',
              },
            },
          ],
        },
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar rootMenu' });
    })
    .catch((err) => console.error('Erro sending rootMenu!', err.response?.data || err));
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
