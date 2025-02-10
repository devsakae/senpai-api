const { senpaiMongoDb } = require('../utils/connections');
const { message_hello, canal } = require('../templates');
const { rootMenu } = require('../templates/list');
const { checkCommand, checkLastInteraction } = require('./checkCommand.controller');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];

  /* Testing for admin and subadmin */
  if (
    contact.wa_id === process.env.BOT_ADMIN_WAID ||
    contact.wa_id === process.env.BOT_SUBADMIN_WAID
  ) {
    await checkCommand(req);
  }

  const sender = await senpaiMongoDb
    .collection('customers')
    .findOneAndUpdate({ wa_id: contact.wa_id }, { $set: { "last_contact": new Date() } }, { upsert: true });

  if (!sender) {
    console.info('primeiro contato do usuário!');
    await senpaiMongoDb
      .collection('customers')
      .insertOne({
        wa_id: contact.wa_id,
        name: contact?.profile?.name,
        contact: contact,
        first_contact: new Date(),
        last_contact: new Date(),
      })
      .then((response) => {
        if (!response.acknowledged)
          throw new Error({
            message: 'Erro criando usuário no MongoDB',
            code: 500,
          });
      })
      .catch((err) => console.error(err.code))
      .finally(() => message_hello(req));
  }
  
  if (!checkCommand(req)) return await checkLastInteraction(sender, req);
  
};

module.exports = {
  checkContact,
};
