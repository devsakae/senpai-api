const cron = require('node-cron')
const { organizePremium } = require('../assinaturas/premiumControl');

const premiumCheck = () => {
  cron.schedule('1 0 * * *', () => {
    console.info('(CRONJOB) checking premium users ending in couple days...');
    organizePremium();
  });
}

module.exports = {
  premiumCheck,
}