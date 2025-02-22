const { default: axios } = require('axios');
const coupons = require('../../data/cp.json');
const { senpaiMongoDb } = require('../utils/connections');
const { randomizeThis, msg_premium_thankyou } = require('../templates/info');


const checkCupom = async (body, user) => {
  const userCoupon = body.split(' ')[1].trim();
  if (coupons[userCoupon] && coupons[userCoupon] > 0) {
    return await senpaiMongoDb.collection('customers').findOneAndUpdate(
        { wa_id: user.wa_id },
        {
          $set: {
            premium: true,
            subscription: {
              type: 'premium',
              start: new Date(),
            },
          },
        },
        { upsert: true },
      )
      .then((res) => {
        console.log(res);
        coupons[userCoupon] = coupons[userCoupon] - 1;
        fs.writeFileSync(
          '../../data/cp.json',
          JSON.stringify(coupons, null, 4),
          'utf-8',
          (err) => err,
        );
        console.info('🔆 Usuário', res.profile.name, 'virou premium com o cupom', userCoupon);
        return welcome_premium(res);
      })
      .catch((err) =>
        console.error('Erro concedendo cupom', err.response?.data || err),
      );
  }
};

const welcome_premium = async ({ wa_id }) => {
  const welcome_message = randomizeThis(msg_premium_thankyou);
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: "whatsapp",    
      recipient_type: "individual",
      to: wa_id,
      type: "text",
      text: {
          preview_url: false,
          body: welcome_message
      }
    }
  })
}

module.exports = {
  checkCupom,
};
