const { senpaiMongoDb } = require("../../app");
const { menu } = require("../templates");


const checkContact = async (req) => {
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  const msg_payload = req.body.entry[0]?.changes[0]?.value?.messages[0];
  const sender = await senpaiMongoDb
                        .collection('customers')
                        .findOne({ "wamid": msg_payload.id });
  if (sender) console.log('found')
  else {
    await senpaiMongoDb
          .collection('customers')
          .insertOne({ 
            "wamid": msg_payload.id,
            "name": contact?.profile?.name,
            "contact": contact,
            "first_contact": new Date(),
          })
          .then((response) => console.log(response.data))
          .catch((err) => console.error(err.code))
          .finally(() => menu(req));

  }
}

module.exports = {
  checkContact,
}