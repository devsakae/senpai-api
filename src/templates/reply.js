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
          text: '🎀 Seja Premium!',
        },
        body: {
          text: '🌸 *Pro* – R$ 4,90/mês\nhttps://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n\n🪷 *Mestre* – R$ 9,90/mês\nhttps://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\n❓ Após pagar, envie: *.cupom (código de compra)* aqui no WhatsApp para ativar.\n\n⚠️ *Não tem cartão de crédito?* Pague via *Pix*:\n📌 Chave: pix@botdosenpai.com.br\n👤 Titular: 59.053.632 Marcelo Pinho de Oliveira\n\nDúvidas? Fale com nosso suporte 👇',
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: '.cupom',
                title: '✅ Possuo um Código',
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
