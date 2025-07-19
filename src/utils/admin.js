const { default: axios } = require("axios");
const { senpaiMongoDb } = require("./connections");
const { sendAdmin } = require("./sender");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, SUPORTE_TECNICO } = process.env;

const addTesterUser = async (user) => {
  return await senpaiMongoDb.collection('customers').findOneAndUpdate({
    wa_id: user
  }, {
    $set: {
      tester: true
    }
  }).then(async res => await sendAdmin(`Usuário ${res?.name} - ${res?.wa_id} adicionado como tester!`))
    .catch(async err => await sendAdmin('Erro adicionando usuário como tester'))
}

const blockUser = async (user) => {
  let blockResponse = "";
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      block_users: [
        {
          user: user
        }
      ]
    },
  })
    .then(res => {
      if (res?.data?.block_users?.added_users
        && res?.data?.block_users.added_users.some(au => au.wa_id === user))
        blockResponse = `Usuário ${user} bloqueado com sucesso`;
      else blockResponse = 'Erro ao bloquear'
    })
    .catch(error => blockResponse = error.response.data || error)
    .finally(async () => await sendAdmin(blockResponse));
}

const countUsers = async () => {
  const countedDocs = await senpaiMongoDb.collection('customers').countDocuments({});
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      block_users: [
        {
          user: user
        }
      ]
    },
  })
    .then(async res => await sendAdmin(`✅ Já estamos com *${countedDocs}* usuários registrados no banco de dados.`))
    .catch(error => console.error(error?.details || error))
    .finally(async () => await sendAdmin(blockResponse));
}

module.exports = {
  addTesterUser,
  blockUser,
  countUsers,
}