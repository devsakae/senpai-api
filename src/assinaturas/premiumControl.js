const { default: axios } = require('axios');
const { senpaiMongoDb } = require('../utils/connections');

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
        type: 'text',
        text: {
          preview_url: false,
          body: 'Sua conta Premium está próximo de expirar... Que tal garantir uma assinatura?\n\nAcesse nosso menu e selecione Quero ser Premium!\n\nEnvie .getpremium',
        },
      },
    })
      .then((response) => {
        if (response.status !== 200 || response.statusText !== 'OK')
          throw new Error({ response: 'status !== 200' });
        return;
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