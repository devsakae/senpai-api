const { default: axios } = require('axios');
const { senpaiMongoDb } = require('../utils/connections');
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const organizePremium = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59);
  const allPremiumDbUsers = await getPremiumDbUsers();
  const endingPremiums = allPremiumDbUsers?.filter(ep => new Date(ep.subscription.end) <= tomorrow)

  await Promise.all(endingPremiums.map(async (ep) => {
    console.log('sending premium message expiration to', ep?.wa_id, ep?.profile?.wa_name);

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
        to: ep.wa_id,
        type: "interactive",
        interactive: {
          type: "button",
          header: {
            type: "text",
            text: "🕒 Lembrete de Renovação"
          },
          body: {
            text: "Olá! Sua assinatura Premium do Bot do Senpai está prestes a expirar.\n\n💳 Se você pagou com cartão de crédito, a renovação é automática se houver saldo disponível.\n\n🔁 Caso queira renovar manualmente ou fazer o pagamento por Pix, siga as instruções:\n\n✅ Plano Pro: Stickers ilimitados | Stickers com IA | Buscador de stickers | Conversa interativa\n Valor: R$ 4,90 por mês\n Link: https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n\n❇️ Plano Master: Tudo do Plano Pro | Gerador de Imagem com IA \n Valor: R$ 9,90 por mês\n Link: https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\nℹ️ Se você não possui cartão de crédito e mesmo assim quer adquirir um dos planos, faça o pagamento por Pix no valor correspondente do plano que deseja adquirir.\n Chave: pix@botdosenpai.com.br\n Titular: 59.053.632 Marcelo Pinho de Oliveira\n\n Desde logo, nosso muito obrigado antecipadamente por ser nosso assinante! :)"
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: ".suporte",
                  title: "💬 Falar com Suporte"
                }
              }
            ]
          }
        }

      },
    })
      .then((response) => {
        if (response.status !== 200 && response.statusText !== 'OK')
          throw new Error({ response: { data: 'status !== 200' } });
        return console.log('[endingpremium] Ok!', response);
      })
      .catch((err) => console.error('Erro ao enviar premium expiration!', err.response?.data || err));
  }))
};

const removeExpiredPremium = async () => {
  console.log('[.removeexpiredpremium] inicializando...')
  const expiredPremium = await getExpiringPremiumDbUsers();
  console.log(expiredPremium)
  if (expiredPremium.length === 0) return console.info('[.removeexpiredpremium] great! no expiring premium user found today.')
  console.log("[.removeexpiredpremium]", expiredPremium.length, "expired premium users found, cleaning...");
  console.info('[.removeexpiredpremium] test complete. Check array:')
  await Promise.all(expiredPremium.map(async ep => {
    console.info("updating on customers db...")
    await senpaiMongoDb.collection("customers").findOneAndUpdate({
      wa_id: ep.wa_id
    }, {
      $set: {
        premium: false,
        "subscription.type": "free",
      }
    });
  })).then(async res => {
    console.info("deleting from premium db...")
    await Promise.all(expiredPremium.map(async ep => {
      await senpaiMongoDb.collection("premium").findOneAndDelete({ wa_id: ep.wa_id });
    }))
  }).catch(err => console.error("error removing expired:", err.data || err));

}

const getPremiumDbUsers = async () => {
  return await senpaiMongoDb
    .collection('premium')
    .find()
    .toArray();
}

const getExpiringPremiumDbUsers = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59);
  console.log('[.getexpiringpremium]', yesterday)
  return await senpaiMongoDb
    .collection('premium')
    .find({
      "subscription.end": {
        $lte: new Date(yesterday)
      }
    })
    .toArray();
}

const calculateDate = (today, diff) => {
  let thisDate = new Date(today);
  thisDate.setDate(thisDate.getDate() + diff);
  return thisDate;
}

module.exports = {
  organizePremium,
  removeExpiredPremium,
}