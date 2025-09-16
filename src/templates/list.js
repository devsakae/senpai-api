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
          text: `Olá, *${contact.profile.name}*, como posso ajudar você hoje?\n\n🎀 Sou a *BotDoSenpai.com.br*, oficialmente reconhecida pelo *WhatsApp*. Sua *segurança* vem sempre em primeiro lugar, sem nenhum risco de *banimento*. Pode contar comigo a qualquer hora, com carinho e dedicação! 💖\n\nSe é sua primeira vez por aqui, explore uma das opções abaixo:\n\n🖼️ *Envie uma imagem ou gif* que eu transformo automaticamente em figurinha \n\n💙 *Ativar VIP*: Tenha acesso a *tudo sem limites*, com funções exclusivas\n\n📢 *Canal*: Entre no meu canal e receba *cupons e novidades em primeira mão*\n\n🛠️ *Suporte*: Fale com meu suporte técnico sempre que precisar\n\n💡 Dica: Quem ativa o *VIP* ganha acesso imediato a funções exclusivas e *ilimitadas!*`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: '.getpremium',
                title: '💙 Ativar VIP',
              },
            },
            {
              type: 'reply',
              reply: {
                id: '.suporte',
                title: '🛠️ Suporte',
              },
            },
            {
              type: 'reply',
              reply: {
                id: '.canal',
                title: '📢 Canal',
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
          text: '✅ Comandos Disponíveis',
        },
        body: {
          text: message_body,
        },
        footer: {
          text: 'Bem-vindo(a) ao nosso espaço especial!',
        },
        action: {
          button: '📂 Menu', // <= Máximo 20 caracteres
          sections: [
            {
              title: '🎨 Figurinhas',
              rows: [
                {
                  id: '.sticker',
                  title: 'Sticker',
                  description: 'Imagem, vídeo ou GIF viram figurinha! (⚠️ Vídeos: máx. 4 seg)',
                },
                {
                  id: '.stickerai',
                  title: 'Stickerai',
                  description: 'Digite uma ideia e veja a mágica da IA virar figurinha!',
                },
              ],
            },
            {
              title: '⚙️ Utilidades',
              rows: [
                {
                  id: '.google',
                  title: 'Google',
                  description: 'Faça buscas no Google sem sair do chat!',
                },
              ],
            },
            {
              title: '📞 Suporte & Infos',
              rows: [
                {
                  id: '.suporte',
                  title: 'Suporte',
                  description: 'Atendimento exclusivo.',
                },
                {
                  id: '.feedback',
                  title: 'Feedback',
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
