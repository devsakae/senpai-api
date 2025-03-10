const { ADMIN_CMD_ADDPREMIUM } = process.env;
const { checkCommand } = require('./checkCommand.controller');
const { manualPremiumActivation } = require('./premium.controller')

const adminCommand = async (req) => {
  console.log('startswith', ADMIN_CMD_ADDPREMIUM)
  const commands = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body
  if (commands.startsWith(ADMIN_CMD_ADDPREMIUM)) {
    return await manualPremiumActivation(req);
  }
  return await checkCommand({ premium: true }, req);
}

module.exports = {
  adminCommand
}