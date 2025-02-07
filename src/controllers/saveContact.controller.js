const { senpaiMongoDb } = require('../utils/connections');
const { message_hello } = require("../templates");

const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  const sender = await senpaiMongoDb
                        .collection('customers')
                        .findOne({ "wa_id": contact.wa_id });
  if (sender) {
    return console.info('(usuário conhecido do bot)');
  }
  else {
    console.info('dando boas vindas ao usuário')
    await senpaiMongoDb
          .collection('customers')
          .insertOne({ 
            "wa_id": contact.wa_id,
            "name": contact?.profile?.name,
            "contact": contact,
            "first_contact": new Date(),
          })
          .then((response) => console.log(response))
          .catch((err) => console.error(err.code))
          .finally(() => message_hello(req));
  }
}

module.exports = {
  checkContact,
}