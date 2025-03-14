const { ADMIN_CMD_ADDPREMIUM } = process.env;
const { bomDia } = require('../premium/bomdia');
const { checkCommand } = require('./checkCommand.controller');
const { manualPremiumActivation } = require('./premium.controller')
const adminDate = new Date(1,1,1);

const adminCommand = async (req) => {
  const commands = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || ''
  if (commands.startsWith(ADMIN_CMD_ADDPREMIUM)) {
    return await manualPremiumActivation(req);
  }
  if (commands.startsWith('.bomdia')) {
    const bomDiaRes = await bomDia();
    console.log(bomDiaRes);
  }
  return await checkCommand({ premium: true, last_time: { contact: adminDate, image: adminDate, text: adminDate, video: adminDate } }, req);
}

module.exports = {
  adminCommand
}