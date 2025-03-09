const { ADMIN_CMD_ADDPREMIUM } = process.env;
const { manualPremiumActivation } = require('./premium.controller')

const adminCommand = async (req) => {
  const commands = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body
  if (commands.startsWith(ADMIN_CMD_ADDPREMIUM)) {
    return await manualPremiumActivation(req);
  }
}

module.exports = {
  adminCommand
}