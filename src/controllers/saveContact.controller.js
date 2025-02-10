const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require('../templates');
const {
  checkCommand,
  checkLastInteraction,
} = require('./checkCommand.controller');

const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];

  const sender = await senpaiMongoDb
    .collection('customers')
    .findOneAndUpdate(
      { wa_id: contact.wa_id },
      { $set: { last_contact: new Date() } },
      { upsert: true },
    );

  if (!sender) {
    console.info('primeiro contato do usuário!');
    return await senpaiMongoDb
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

  /* Testing for admin and subadmin */
  if (
    contact.wa_id === process.env.BOT_ADMIN_WAID ||
    contact.wa_id === process.env.BOT_SUBADMIN_WAID
  ) {
    if (!checkCommand(req)) return await checkLastInteraction(sender, req);
  }

  // if (!checkCommand(req)) {
  //   // return await checkLastInteraction(sender, req);
  //   return console.info('iniciando fluxo com usuário');
  // }
};

module.exports = {
  checkContact,
};
