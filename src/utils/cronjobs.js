const cron = require('node-cron')

cron.schedule('1 0 * * *', () => {
  console.log('running a task every minute');
});


module.exports = {

}