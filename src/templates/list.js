const { default: axios } = require('axios');
const { randomizeThis, msg_tutorials } = require('./info');
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

const completeMenu = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = payload?.contacts || payload?.contacts[0];
  const message_body = randomizeThis(msg_tutorials);
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
        type: 'list',
        header: {
          type: 'text',
          text: 'Menu de opções do Bot do Senpai',
        },
        body: {
          text: message_body,
        },
        footer: {
          text: 'Dúvidas? Acesse nosso site em http://www.botdosenpai.com.br',
        },
        action: {
          button: 'Stickers e Figurinhas :)',
          sections: [
            {
              title: 'Como fazer figurinhas?',
              rows: [
                {
                  id: 'sticker001',
                  title: 'Tutorial Básico',
                  description: 'Digite .sticker e aprenda a criar um sticker!',
                },
                {
                  id: 'sticker002',
                  title: 'Termos de Uso',
                  description: 'Ao criar um sticker conosco, você está concordando com os termos de uso disponível em http://www.botdosenpai.com.br/politica',
                },
              ],
            },
            {
              title: 'Utilitários',
              rows: [
                {
                  id: 'util001',
                  title: '.google [pesquisa]',
                  description: 'Pesquiso no Google pra você',
                },
                {
                  id: '.util002',
                  title: '.piada',
                  description: 'Conto uma piada sem graça',
                },
              ],
            },
            {
              title: 'Exclusivo para PREMIUM!',
              rows: [
                {
                  id: '.premium001',
                  title: '.stickerai [descrição]',
                  description: 'Você descreve a figurinha perfeita e eu crio ela. Eu prometo.',
                },
                {
                  id: '.premium002',
                  title: '.lembrete',
                  description: 'Te ajudo a não esquecer das coisas',
                },
                {
                  id: '.premium003',
                  title: '.clima [horário] [localização]',
                  description: 'Receba a previsão do tempo todo dia no horário definido para a localização que você quiser',
                },
                {
                  id: '.premium004',
                  title: '.news [palavra-chave]',
                  description: 'Novidades fresquinhas do que mais te interessa, direto no seu Whats!',
                },
              ],
            },
          ],
        },
      },
    }
  })
};

module.exports = {
  rootMenu,
  completeMenu,
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
