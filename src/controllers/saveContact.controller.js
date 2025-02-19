const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { checkLastInteraction } = require('./checkCommand.controller');
const { markAsRead } = require('./markAsRead.controller');
const { stickerTutorial, freeUserStickerLimit } = require('../templates/sticker');
const testers = process.env.TESTERS.split(',');

const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  const now = new Date();

  const sender = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact?.profile?.name,
        contact: contact,
        last_contact: now,
        last_type: req.body.entry[0]?.changes[0]?.value?.messages[0]?.type,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    },
  );

  if (!sender) return await message_hello(req);

  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  if (
    req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'image'
    && sender?.last_sticker instanceof Date
    && new Date(sender?.last_sticker) > twentyFourHoursAgo
  ) {
    return await freeUserStickerLimit(req);
  }

  /* Testing for admin and subadmin */
  if (testers.includes(contact.wa_id)) {
    await markAsRead(req.body.entry[0]?.changes[0]?.value);
    return await checkLastInteraction(sender, req);
  }

  return;
};

module.exports = {
  checkContact,
};
