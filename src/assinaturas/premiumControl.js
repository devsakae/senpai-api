const { default: axios } = require('axios');
const { senpaiMongoDb } = require('../utils/connections');

const organizePremium = async () => {
  const today = new Date();

  const endingPremiums = await senpaiMongoDb
    .collection('premium')
    .find({ 'subscription.end': { $lt: calculateDate(today, 1) } })
    .toArray();

  await Promise(endingPremiums.map(async (ep) => {
    console.log('sending premium message expiration to', ep.wa_id, ep.wa_name);
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
          body: 'Sua conta Premium está próximo de expirar... Que tal garantir uma assinatura?\n\nAcesse nosso menu e selecione Quero ser Premium!',
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

const calculateDate = (today, diff) => {
  let thisDate = new Date(today);
  thisDate.setDate(thisDate.getDate() + diff);
  return thisDate;
}

module.exports = {
  organizePremium,
}