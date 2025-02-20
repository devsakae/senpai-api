const fs = require('fs');
const testData = require('../../data/data.json');
const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const { checkLastInteraction } = require('./checkCommand.controller');
const { markAsRead } = require('./markAsRead.controller');
const { freeUserStickerLimit } = require('../templates/sticker');
const testers = process.env.TESTERS.split(',');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = payload?.contacts[0];
  const now = new Date();

  const user = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact?.profile?.name,
        contact: contact,
        last_contact: now,
        last_type: payload?.messages[0]?.type,
      },
    },
    { upsert: true },
  );

  if (!user) return await message_hello(req);

  /* Testing for admin and subadmin */
  if (testers.includes(contact.wa_id) || user.premium) {
    testData.incoming.push(req.body);
    fs.writeFileSync(
      './data/testers.json',
      JSON.stringify(testData, null, 4),
      'utf-8',
      (err) => err,
    );
    await markAsRead(payload);
  }
  if (payload?.messages[0]?.type === 'image') {
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (
      user?.last_sticker instanceof Date &&
      new Date(user?.last_sticker) > twentyFourHoursAgo
    ) {
      return await freeUserStickerLimit(req);
    }
    await senpaiMongoDb
      .collection('customers')
      .findOneAndUpdate(
        { wa_id: contact.wa_id },
        { $set: { last_sticker: now } },
        { upsert: true },
      );
  }
  return await checkLastInteraction(user, req);
};

module.exports = {
  checkContact,
};
