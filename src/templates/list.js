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

const rootMenu = async (contact) => {
  let data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: contact.wa_id,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: `Olá, *${contact.profile.name}*, como posso ajudar você hoje?\n\nSomos um Bot gratuito disponível 24 horas para você aproveitar a qualquer momento! Acesse nosso site para mais informações: http://www.botdosenpai.com.br\n\nSe tiver dúvidas de como usar o Senpai Bot, selecione uma das opções abaixo:`,
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: '.canal',
              title: '.canal (Canal de atualizações ee descontos)',
            },
          },
          {
            type: 'reply',
            reply: {
              id: '.suporte',
              title: '.suporte (Falar com um atendente)',
            },
          },
          {
            type: 'reply',
            reply: {
              id: '.sobre',
              title: '.sobre (Conheça mais sobre nós)',
            },
          },
        ],
      },
    },
  };
  return await dispatchAxios(data)
    .then((res) => console.log('ok', res))
    .catch((err) => console.error('erro', err));
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
