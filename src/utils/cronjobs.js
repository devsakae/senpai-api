const cron = require('node-cron')
const { organizePremium, removeExpiredPremium } = require('../assinaturas/premiumControl');
const { bomDia } = require('../premium/bomdia');

const premiumCheck = () => {
  cron.schedule('0 10 * * *', () => {
    console.info('(CRONJOB) checking premium users ending in couple days...');
    organizePremium();
  });
}

const premiumClean = () => {
  cron.schedule('1 0 * * *', () => {
    console.info('(CRONJOB) cleaning old premium users...');
    removeExpiredPremium();
  });
}

const callBomDia = () => {
  cron.schedule('20 7 * * *', () => {
    console.info('(CRONJOB) calling bom dia...')
    bomDia();
  });
}

module.exports = {
  premiumCheck,
  callBomDia,
  premiumClean,
}