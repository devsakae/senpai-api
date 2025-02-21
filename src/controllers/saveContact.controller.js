const fs = require('fs');
const testData = require('../../data/testers.json');
const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const {
  checkLastInteraction,
  checkCommand,
} = require('./checkCommand.controller');
const { freeUserStickerLimit } = require('../templates/sticker');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (!payload.contacts[0]) return console.error('no contact object @', payload);
  const contact = payload.contacts[0];
  const now = new Date();

  const user = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact.profile?.name,
        contact: contact,
        last_time: {
          contact: now,
          [payload.messages[0]?.type]: now,
        },
        subscription: {
          start: now,
        }
      },
    },
    { upsert: true },
  );

  // const user = await senpaiMongoDb
  //   .collection('customers')
  //   .findOne({ wa_id: contact?.wa_id });

  console.info(user);

  if (!user) return await message_hello(req)

  /* Testing for admin and subadmin */
  if (user && user.premium) {
    testData.incoming.push(req.body);
    fs.writeFileSync(
      './data/testers.json',
      JSON.stringify(testData, null, 4),
      'utf-8',
      (err) => err,
    );
    return await checkCommand(user, req);
  }

  // Free user sent image
  if (payload.messages[0]?.type === 'image') {
    if (
      user?.last_time?.image instanceof Date &&
      now.getTime() - user?.last_time?.image.getTime() > 86400
    ) {
      return await freeUserStickerLimit(req);
    }
  }

  // Free user sent something else
  return await checkLastInteraction(user, req);
};

module.exports = {
  checkContact,
};
