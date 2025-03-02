const { senpaiMongoDb } = require('../utils/connections');

const organizePremium = async () => {
  const today = new Date();

  const endingPremiums = await senpaiMongoDb
    .collection('premium')
    .find({ 'subscription.end': { $lt: calculateDate(today, 1) }})
    .toArray();
  
  await Promise(endingPremiums.map((ep) => {
    console.log('send warning message to', ep.wa_id, ep.wa_name)
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