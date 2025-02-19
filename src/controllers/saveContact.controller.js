const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { checkLastInteraction } = require('./checkCommand.controller');
const { markAsRead } = require('./markAsRead.controller');
const testers = process.env.TESTERS.split(',');

const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last_sticker =
    req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'image'
      ? now
      : '$last_sticker';

  const sender = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact?.profile?.name,
        contact: contact,
        last_contact: now,
        last_type: req.body.entry[0]?.changes[0]?.value?.messages[0]?.type,
        last_sticker: last_sticker,
      },
    },
    { upsert: true },
  );

  if (!sender) return await message_hello(req);

  /* Testing for admin and subadmin */
  if (testers.includes(contact.wa_id)) {
    await markAsRead(req.body.entry[0]?.changes[0]?.value);
    return await checkLastInteraction(sender, req);
    //return await checkCommand(sender, req);
  }

  // if (!checkCommand(req)) {
  //   // return await checkLastInteraction(sender, req);
  //   return console.info('iniciando fluxo com usuário');
  // }
};

module.exports = {
  checkContact,
};
