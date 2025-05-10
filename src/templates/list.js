const { default: axios } = require('axios');
const { randomizeThis, msg_tutorials } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

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
          text: `Olá, *${contact.profile.name}* 👋 Como posso te ajudar hoje?\n\n🤖 Sou a *Bot do Senpai*, sua assistente virtual gratuita disponível 24 horas por dia pra te ajudar sempre que precisar!\n\nSe é sua primeira vez por aqui, comece explorando uma das opções abaixo:\n\n- 🖼️ *Envie uma imagem, vídeo ou gif* que eu transformo automaticamente em figurinha pra você!\n- 📢 *.canal*: Entre no meu canal no WhatsApp e receba dicas, cupons e sorteios exclusivos!\n- 🛠️ *.suporte*: Precisa de ajuda? Chame meu suporte técnico a qualquer momento.\n- ℹ️ *.sobre*: Conheça mais sobre quem eu sou e tudo o que posso fazer por você.\n\n🚧 *Estou em fase BETA*, em breve trarei ainda mais novidades pra você!\n\n🔒 Pode ficar tranquilo(a)! Eu faço parte do sistema oficial do WhatsApp e sigo todas as normas de segurança. Você pode se divertir à vontade, porque aqui sua experiência e privacidade são prioridade!`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: '.canal',
                title: 'Canal',
              },
            },
            {
              type: 'reply',
              reply: {
                id: '.suporte',
                title: 'Suporte',
              },
            },
            {
              type: 'reply',
              reply: {
                id: '.getpremium',
                title: 'Quero ser Premium!',
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
  const contact = payload?.contacts[0];
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
          text: '🌟 Menu Premium 🌟',
        },
        body: {
          text: message_body,
        },
        footer: {
          text: 'Sua colaboração mantém nosso bot vivo. Obrigado pelo apoio!',
        },
        action: {
          button: '📜 Ver Menu', // <= Máximo 20 caracteres
          sections: [
            {
              title: '🎨 Figurinhas',
              rows: [
                {
                  id: '.sticker',
                  title: '.sticker',
                  description: 'Imagem, vídeo ou GIF viram figurinha!',
                },
                {
                  id: '.stickerai',
                  title: '.stickerai',
                  description: 'Crie figurinhas com IA!',
                },
              ],
            },
            {
              title: '⚙️ Utilidades',
              rows: [
                {
                  id: '.google',
                  title: '.google',
                  description: 'Pesquiso no Google por você!',
                },
                {
                  id: '.imagem',
                  title: '.imagem',
                  description: 'Envio imagens sobre o tema escolhido!',
                },
              ],
            },
            {
              title: '📞 Suporte & Infos',
              rows: [
                {
                  id: '.suporte',
                  title: '.suporte',
                  description: 'Atendimento exclusivo.',
                },
                {
                  id: '.feedback',
                  title: '.feedback',
                  description: 'Envie sua opinião.',
                },
                {
                  id: '.privacy',
                  title: 'Termos de Uso',
                  description: 'Leia nossos termos de uso.',
                },
              ],
            },
          ],
        },
      },
    }
  }).then((res) => {
    if (res.status !== 200) throw new Error({ response: { data: "Retorno de status diferente de 200" } })
  }).catch((err) => console.error("Error sending completeMenu", err.response?.data || err))
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
