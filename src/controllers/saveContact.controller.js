const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { checkLastInteraction } = require('./checkCommand.controller');
const { markAsRead } = require('./markAsRead.controller');
const {
  freeUserStickerLimit,
} = require('../templates/sticker');
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
    { upsert: true },
  );

  if (!sender) return await message_hello(req);

  /* Testing for admin and subadmin */
  if (testers.includes(contact.wa_id)) {
    await markAsRead(req.body.entry[0]?.changes[0]?.value);
    return await checkLastInteraction(sender, req);
  }

  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  if (req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'image') {
    console.log('usuário mandou imagem...');
    if (
      sender?.last_sticker instanceof Date &&
      new Date(sender?.last_sticker) > twentyFourHoursAgo
    ) {
      console.log('...mas só pode 1 por dia!');
      return await freeUserStickerLimit(req);
    }
    console.log('...e eu gravei esse horário no db:', now);
    await senpaiMongoDb.collection('customers').findOneAndUpdate(
      { wa_id: contact.wa_id },
      { $set: { last_sticker: now } },
      { upsert: true },
    );
  }

  return;
};

module.exports = {
  checkContact,
};
