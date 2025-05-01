const { default: axios } = require('axios');
const { randomizeThis, msg_premium_wannabe } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

const getPremiumNow = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = payload?.contacts || payload?.contacts[0];
  if (!contact) return;
  const premium_body = randomizeThis(msg_premium_wannabe);
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
        header: {
          type: 'text',
          text: 'Um bot completo pra você.',
        },
        body: {
          text: premium_body,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'getpremium',
                title: 'Quero ser Premium!',
              },
            },
          ],
        },
      },
    },
  });
};

const getPremiumWithoutFlow = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = payload?.contacts || payload?.contacts[0];
  if (!contact) return;
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
        header: {
          type: 'text',
          text: '🎀 Benefícios dos Planos',
        },
        body: {
          text: 'Aqui estão os detalhes dos nossos planos Premium:\n\n🇯🇵 *Plano Grátis* • R$ 0,00/mês\n• 1 figurinha a cada 24 horas\n\n🌸 *Plano Pro* • R$ 4,90/mês\n• Figurinhas ilimitadas\n• Modo Conversa • fale com a IA como uma amiga\n• Atualizações constantes\n• Comandos avançados\n\n❤️ *Plano Mestre* • R$ 9,90/mês\n• Tudo do plano Pro\n• StickerAI • Criação de figurinhas com IA\n• ImagemIA • Gere imagens do seu jeito\n• Modo Conversa Avançado • IA ainda mais inteligente\n• Novidades exclusivas para assinantes\n\n💬 Suporte & Disponibilidade • Válido para todos os planos\n• Suporte sempre disponível\n• 99,9% de tempo online\n\n🔹 Caso tenha qualquer dúvida sobre a forma de pagamento ou queira mais detalhes sobre nossos planos, clique no botão abaixo e fale diretamente com o nosso suporte. Estamos aqui para ajudar!',
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: '.voltar',
                title: '🔙 Voltar',
              },
            },
            {
              type: 'reply',
              reply: {
                id: '.suporte',
                title: '💬 Falar com Suporte',
              },
            },
          ],
        },
      },
    },
  });
};

module.exports = {
  getPremiumNow,
  getPremiumWithoutFlow,
};
