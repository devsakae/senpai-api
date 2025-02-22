const coupons = require('../../data/cp.json');
const senpaiMongoDb = require('../utils/connections');

const checkCupom = async (body, user) => {
  const userCoupon = body.split(' ')[1].trim();
  if (coupons[userCoupon] && coupons[userCoupon] > 0) {
    await senpaiMongoDb
      .collection('customers')
      .findOneAndUpdate(
        { wa_id: user.wa_id },
        {
          $set: {
            name: user?.profile?.name,
            user: user,
            premium: true,
            subscription: {
              type: 'premium',
              start: now,
            },
          },
        },
        { upsert: true },
      )
      .then(() => {
        coupons[userCoupon] = coupons[userCoupon] - 1;
        fs.writeFileSync(
          '../../data/cp.json',
          JSON.stringify(coupons, null, 4),
          'utf-8',
          (err) => err,
        );
        console.info('🔆 Usuário', user.profile.name,'virou premium!');
      })
      .catch((err) =>
        console.error('Erro concedendo cupom', err.response?.data || err),
      );
  }
};

module.exports = {
  checkCupom,
};
