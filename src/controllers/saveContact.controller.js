const { senpaiMongoDb } = require('../utils/connections');
const { message_hello, canal } = require('../templates');
const { dispatchAxios } = require('../utils/sender');
const { rootMenu } = require('../templates/list');

const checkContact = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];

  /* Testing for admin and subadmin */
  if (
    contact.wa_id === process.env.BOT_ADMIN_WAID ||
    contact.wa_id === process.env.BOT_SUBADMIN_WAID
  ) {
    if (payload?.messages[0]?.text?.body === '.canal') return await canal(req);
    return rootMenu(contact);
  }

  const sender = await senpaiMongoDb
    .collection('customers')
    .findOne({ wa_id: contact.wa_id });
  if (!sender) {
    console.info('primeiro contato do usuário!');
    await senpaiMongoDb
      .collection('customers')
      .insertOne({
        wa_id: contact.wa_id,
        name: contact?.profile?.name,
        contact: contact,
        first_contact: new Date(),
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
};

module.exports = {
  checkContact,
};
