const { ADMIN_CMD_ADDPREMIUM } = process.env;
const { bomDia } = require('../premium/bomdia');
const { sendPremium } = require('../utils/sender');
const { checkCommand } = require('./checkCommand.controller');
const { manualPremiumActivation } = require('./premium.controller')
const adminDate = new Date(1,1,1);

const adminCommand = async (req) => {
  const commands = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || ''
  if (commands.startsWith(ADMIN_CMD_ADDPREMIUM)) {
    return await manualPremiumActivation(req);
  }
  if (commands.startsWith('.bomdia')) await bomDia();
  if (commands.startsWith('.anunciar ')) await sendPremium(commands.split(".anunciar ")[1]);
  return await checkCommand({ premium: true, tester: true, last_time: { contact: adminDate, image: adminDate, text: adminDate, video: adminDate }, name: "Administrador", subscription: { type: "premium" } }, req);
}

module.exports = {
  adminCommand
}