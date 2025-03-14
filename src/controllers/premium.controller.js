const { default: axios } = require("axios");
const { senpaiMongoDb } = require("../utils/connections");
const { sendAdmin } = require("../utils/sender");
const { msg_limitsticker, msg_premium_wannabe, randomizeThis } = require("../templates/info");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, } = process.env;

const getPremiumUsers = async () => {
  const premiumUsers = await senpaiMongoDb.collection('premium').find().toArray();
  return premiumUsers;
}

const getAllUsers = async () => {
  const allUsers = await senpaiMongoDb.collection('customers').find().toArray();
  return allUsers;
}

const limitedStickerPremiumPlan = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const response = randomizeThis(msg_limitsticker) + "\n\n" + randomizeThis(msg_premium_wannabe) + "\n\nPrÃ³ximo sticker a partir de " + new Date((payload?.messages[0]?.timestamp * 1000) + 86400000).toLocaleString('pt-br', { timeZone: "America/Sao_Paulo" });
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
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: 'text',
          text: 'Oh-oh!',
        },
        body: {
          text: response,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: '.getpremium',
                title: 'Quero ser Premium!',
              },
            },
          ],
        },
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error(err.code));
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
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: 'https://api.botdosenpai.com/senpailogo'
                }
              }
            ]
          }
        ],
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch((err) => console.error('Erro enviando premiumPlans', err?.data || err));
}

const manualPremiumActivation = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const commands = payload?.messages[0]?.text?.body.split(' ');
  if (commands.length !== 4 || (commands[2] !== 'premium' && commands[2] !== 'basico')) return sendAdmin('Erro: Utilize o comando', ADMIN_CMD_ADDPREMIUM, '[wa_id] [premium/basico] [dias], como no exemplo: ', ADMIN_CMD_ADDPREMIUM, '554899787078 basico 30')
  const today = new Date();
  const expirationDate = today;
  expirationDate.setDate(today.getDate() + Number(commands[3]))
  const newPremiumUser = await senpaiMongoDb
    .collection('customers')
    .findOneAndUpdate(
      { wa_id: commands[1] },
      {
        $set: {
          premium: true,
          subscription: {
            type: commands[2],
            start: today,
            end: expirationDate
          }
        }
      })
  if (!newPremiumUser) return sendAdmin('Erro: Usuário não existe no banco de dados. Verificar wa_id.');
  await senpaiMongoDb.collection('premium').insertOne({
    ...newPremiumUser,
    premium: true,
    subscription: {
      type: commands[2],
      start: today,
      end: expirationDate
    }
  })
    .then(() => sendAdmin('Conta premium concedida!'))
    .catch((err) => console.error('Erro salvando usuário premium na collection premium'));
  return;
}

module.exports = {
  getPremiumUsers,
  getAllUsers,
  limitedStickerPremiumPlan,
  premiumPlans,
  manualPremiumActivation,
}