const cron = require('node-cron')
const { organizePremium } = require('../assinaturas/premiumControl');

cron.schedule('1 0 * * *', () => {
  console.info('(CRONJOB) checking premium users ending in couple days...');
  organizePremium();
});

module.exports = {

}