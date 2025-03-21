const { senpaiMongoDb } = require("./connections");
const { sendAdmin } = require("./sender");

const addTesterUser = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0].wa_id;
  return await senpaiMongoDb.collection('customers').findOneAndUpdate({
    wa_id: user
  }, {
    $set: {
      tester: true
    }
  }).then(async res => await sendAdmin(`Usuário ${user} adicionado como tester!`))
  .catch(async err => await sendAdmin('Erro adicionando usuário como tester'))
}

module.exports = {
  addTesterUser,
}