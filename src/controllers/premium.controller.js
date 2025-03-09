const { default: axios } = require("axios");
const { senpaiMongoDb } = require("../utils/connections")
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const getPremiumUsers = async () => {
  const premiumUsers = await senpaiMongoDb.collection('premium').find().toArray();
  return premiumUsers;
}

const getAllUsers = async () => {
  const allUsers = await senpaiMongoDb.collection('customers').find().toArray();
  return allUsers;
}

const premiumPlans = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'template',
      template: {
        name: 'get_premium',
        language: {
          code: 'pt_br',
        },
        components: [
          {
            type: "image",
            image: {
              link: "https://api.botdosenpai.com/senpailogo"
            }
          }
        ],
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error(err.code));
}

module.exports = {
  getPremiumUsers,
  getAllUsers,
  premiumPlans,
}