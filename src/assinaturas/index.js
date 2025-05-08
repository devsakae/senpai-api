const { default: axios } = require('axios');
const { senpaiMongoDb } = require('../utils/connections');
const { randomizeThis, msg_premium_thankyou } = require('../templates/info');
const { sendAdmin } = require('../utils/sender');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

let newPremiumUser = 'User premium/tester ativado. Erro ao salvar.';

const senpaiCoupons = async () => {
  const dbCoupons = await senpaiMongoDb.collection('coupons').find().toArray();
  if (dbCoupons.filter((el) => el.left > 0).length === 0) return [];
  return dbCoupons;
};

const checkCupom = async (body, user) => {
  console.log('checking cupom')
  if (body.length < 8) return false;
  const userCoupon = body.split(' ')[1].trim();
  const dbCoupons = await senpaiCoupons();
  const validCoupom = dbCoupons.find((el) => el.code === userCoupon);

  if (validCoupom && validCoupom.left === 0) return await soldOutCoupom(user);

  if (validCoupom && validCoupom.left > 0) {
    if (user.premium) return console.log('usuário premium', user.profile.name, 'tentou utilizar cupom de ativação premium')
    const today = new Date();
    let endDay = new Date();
    endDay.setDate(endDay.getDate() + validCoupom.days);
    return await senpaiMongoDb
      .collection('customers')
      .findOneAndUpdate(
        { wa_id: user.wa_id },
        {
          $set: {
            premium: true,
            subscription: {
              type: 'basico',
              start: today,
              end: endDay,
              newsletter: true,
            },
          },
        },
        { upsert: true },
      )
      .then(async (res) => {
        await senpaiMongoDb
          .collection('coupons')
          .findOneAndUpdate({ _id: validCoupom._id }, { $inc: { left: -1 } })
          .then(async cpres => {
            newPremiumUser = `🔆 Usuário ${res?.name} @${res?.wa_id} virou Premium/Tester com o cupom ${userCoupon}! Ainda restam: ${cpres.left - 1}`;
            console.info(newPremiumUser);
            await welcome_premium(res);
          })
          .catch(err => console.error('Error updating coupom', err.response?.data || err));
      })
      .catch(err => console.error('Erro concedendo cupom', err.response?.data || err));
    // .finally(async () => await sendAdmin(newPremiumUser));
  }

  return sendAdmin("Código de Compra enviado por", user.wa_id, " (" + user.profile.name + "):", userCoupon);

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
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: wa_id,
      type: 'text',
      text: {
        preview_url: false,
        body: welcome_message,
      },
    },
  });
};

const soldOutCoupom = async (user) => {
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
      to: user.wa_id,
      type: 'text',
      text: {
        preview_url: false,
        body: "Infelizmente o cupom informado não é válido e/ou já se esgotou.\n\nFique ligado no nosso canal para novos cupons!",
      },
    },
  }).then((res) => console.log('informing user', user.profile.name, 'that used a soldout coupon'))
    .catch((err) => console.error('error informing user about soldout coupon', err.data.error.message || err))
}

module.exports = {
  checkCupom,
};
