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
  const contact = payload?.contacts || payload?.contacts[0];
  if (!contact) return console.error('no contact object @', payload);
  const now = new Date();
  
  // const user = await senpaiMongoDb.collection('customers').findOneAndUpdate(
  //   { wa_id: contact.wa_id },
  //   {
  //     $set: {
  //       name: contact?.profile?.name,
  //       contact: contact,
  //       last_time: {
  //         contact: now,
  //         [payload?.messages[0]?.type]: now,
  //       },
  //       premium: false,
  //       subscription: {
  //         type: 'free',
  //         start: now,
  //       }
  //     },
  //   },
  //   { upsert: true },
  // );

  const user = await senpaiMongoDb
    .collection('customers')
    .findOne({ wa_id: contact.wa_id });

  if (!user) {
    return await senpaiMongoDb
      .collection('customers')
      .insertOne(
        { wa_id: contact.wa_id },
        {
          $set: {
            name: contact?.profile?.name,
            contact: contact,
            last_time: {
              contact: now,
              [payload?.messages[0]?.type]: now,
            },
            premium: false,
            subscription: {
              type: 'free',
              start: now,
            },
          },
        },
      )
      .then(async () => await message_hello(req))
      .catch((err) =>
        console.error('Error saving mongodb', err.response?.data || err),
      );
  }

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
  if (payload?.messages[0]?.type === 'image') {
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
