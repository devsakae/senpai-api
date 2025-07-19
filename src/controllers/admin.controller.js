const { ADMIN_CMD_ADDPREMIUM } = process.env;
const { removeExpiredPremium } = require('../assinaturas/premiumControl');
const { bomDia } = require('../premium/bomdia');
const { addTesterUser, blockUser, countUsers } = require('../utils/admin');
const { sendPremium } = require('../utils/sender');
const { checkCommand } = require('./checkCommand.controller');
const { manualPremiumActivation } = require('./premium.controller')
const adminDate = new Date(1,1,1);

const adminCommand = async (req) => {
  const commands = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || ''
  if (commands.startsWith(ADMIN_CMD_ADDPREMIUM)) {
    return await manualPremiumActivation(req);
  }
  if (commands.startsWith('.testing')) return console.log("test successfull");
  if (commands.startsWith('.bomdia')) return await bomDia();
  if (commands.startsWith('.anunciar ')) return await sendPremium(commands.split(".anunciar ")[1]);
  if (commands.startsWith('.tester')) return await addTesterUser(commands.split(".tester ")[1]);
  if (commands.startsWith('.block')) return await blockUser(commands.split(".block ")[1]);
  if (commands.startsWith('.cleanpremium')) return await removeExpiredPremium();
  if (commands.startsWith('.users')) return await countUsers();
  return await checkCommand({ premium: true, tester: true, last_time: { contact: adminDate, image: adminDate, text: adminDate, video: adminDate }, name: "Administrador", subscription: { type: "premium" } }, req);
}

module.exports = {
  adminCommand
}