const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { checkCommand } = require('./checkCommand.controller');

const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  const sender = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact?.profile?.name,
        contact: contact,
        last_contact: new Date(),
        last_type: req.body.entry[0]?.changes[0]?.value?.messages[0]?.type,
        last_sticker: req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'image' ? new Date() : '$last_sticker',
      },
    },
    { upsert: true },
  );

  if (!sender) return await message_hello(req);

  /* Testing for admin and subadmin */
  if (
    contact.wa_id === process.env.BOT_ADMIN_WAID ||
    contact.wa_id === process.env.BOT_SUBADMIN_WAID
  ) {
    // if (!checkCommand(req)) return await checkLastInteraction(sender, req);
    return await checkCommand(sender, req);
  }

  // if (!checkCommand(req)) {
  //   // return await checkLastInteraction(sender, req);
  //   return console.info('iniciando fluxo com usuário');
  // }
};

module.exports = {
  checkContact,
};
