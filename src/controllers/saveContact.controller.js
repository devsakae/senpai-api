const fs = require('fs');
const testData = require('../../data/testers.json');
const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const {
  checkLastInteraction,
  checkCommand,
} = require('./checkCommand.controller');
const { adminCommand } = require('./admin.controller');
const { ADMIN_WAID } = process.env;
const admin_group = ADMIN_WAID.split(',');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (!payload.contacts[0]) return console.error('no contact object @', payload);
  const contact = payload.contacts[0];
  const now = new Date();

  if (admin_group.includes(contact.wa_id)) {
    return await adminCommand(req);
  }

  const user = await senpaiMongoDb.collection('customers').findOneAndUpdate(
    { wa_id: contact.wa_id },
    {
      $set: {
        name: contact.profile?.name,
        contact: contact,
        "last_time.contact": now,
        "last_time.timestamp": payload?.messages[0]?.timestamp,
        [`last_time.${payload.messages[0]?.type}`]: now,
        "subscription.start": now,
      },
    },
    { upsert: true },
  );

  if (!user) return await message_hello(req)

  // Premium bypass
  if (user && user.premium || user.tester) {
    testData.log.push(req.body);
    fs.writeFileSync(
      './data/testers.json',
      JSON.stringify(testData, null, 4),
      'utf-8',
      (err) => err,
    );
    return await checkCommand(user, req);
  }

  // Free user sent something else
  return await checkLastInteraction(user, req);
};

module.exports = {
  checkContact,
};
