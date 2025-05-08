const { default: axios } = require("axios");
const { senpaiMongoDb } = require("../utils/connections");
const { sendAdmin } = require("../utils/sender");
const { msg_limitsticker, msg_premium_wannabe, randomizeThis } = require("../templates/info");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, ADMIN_CMD_ADDPREMIUM } = process.env;

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
  const response = randomizeThis(msg_limitsticker) + "\n\n" + randomizeThis(msg_premium_wannabe) + "\n\nPróximo sticker a partir de " + new Date((payload?.messages[0]?.timestamp * 1000) + 86400000).toLocaleString('pt-br', { timeZone: "America/Sao_Paulo" });
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
        throw new Error({ response: 'ERRO no .limitedStickerPremium' });
    })
    .catch((err) => console.error(err.response?.data || err.response || err));
}

// Planos Premiums usando Template ($)
// const premiumPlans = async (req) => {
//   const payload = req.body.entry[0]?.changes[0]?.value;
//   return await axios({
//     method: 'POST',
//     url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
//     headers: {
//       Authorization: `Bearer ${GRAPH_API_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//     data: {
//       messaging_product: 'whatsapp',
//       recipient_type: 'individual',
//       to: payload?.contacts[0]?.wa_id,
//       type: 'template',
//       template: {
//         name: 'get_premium',
//         language: {
//           code: 'pt_br',
//         },
//         components: [
//           {
//             type: 'header',
//             parameters: [
//               {
//                 type: 'image',
//                 image: {
//                   link: 'https://api.botdosenpai.com/senpailogo'
//                 }
//               }
//             ]
//           }
//         ],
//       },
//     },
//   })
//     .then((response) => {
//       if (response.status !== 200 || response.statusText !== 'OK')
//         throw new Error({ response: 'Erro ao enviar' });
//     })
//     .catch((err) => console.error('Erro enviando premiumPlans', err?.data || err));
// }

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
      type: "interactive",
      interactive: {
        type: "button",
        header: {
          type: "text",
          text: "⛩️ Sua Experiência, Sem Limites!"
        },
        body: {
          text: "🎐 Seja *Pro* ou *Mestre*, o Premium foi feito pra quem quer mais! Mais figurinhas, mais liberdade, mais diversão. Ative e sinta a diferença de ter a *Senpai* só pra você!\n\n🌸 *Pro* – R$ 4,90/mês\nIdeal para quem quer comandos avançados, figurinhas ilimitadas e suporte!\n🔗 https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n\n🪷 *Mestre* – R$ 9,90/mês\nInclui tudo do Pro + recursos de IA, novidades antecipadas e muito mais!\n🔗 https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\n✅ Após o pagamento, envie aqui: *.cupom SEUCÓDIGO*\n\n💳 Sem cartão? Pague via Pix:\n📌 Chave: pix@botdosenpai.com.br\n👤 Titular: 59.053.632 Marcelo Pinho de Oliveira\n\n❓ Dúvidas ou quer comparar os planos? Use os botões abaixo:"
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: ".beneficiosplanos",
                title: "🔓 Benefícios"
              }
            },
            {
              type: "reply",
              reply: {
                id: ".suporte",
                title: "🛠️ Suporte ao Cliente"
              }
            }
          ]
        }
      }
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'ERRO no .getPremium' });
    })
    .catch((err) => console.error(err.response?.data || err.response || err));
}

const beneficiosPlanos = async (req) => {
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
      type: "interactive",
      interactive: {
        type: "button",
        header: {
          type: "text",
          text: "🎀 Benefícios dos Planos"
        },
        body: {
          text: "Aqui estão os detalhes dos nossos planos Premium:\n\n🇯🇵 *Plano Grátis* • R$ 0,00/mês\n• 1 figurinha a cada 24 horas\n\n🌸 *Plano Pro* • R$ 4,90/mês\n• Figurinhas ilimitadas\n• Modo Conversa • fale com a IA como uma amiga\n• Atualizações constantes\n• Comandos avançados\n\n❤️ *Plano Mestre* • R$ 9,90/mês\n• Tudo do plano Pro\n• StickerAI • Criação de figurinhas com IA\n• ImagemIA • Gere imagens do seu jeito\n• Modo Conversa Avançado • IA ainda mais inteligente\n• Novidades exclusivas para assinantes\n\n💬 Suporte & Disponibilidade • Válido para todos os planos\n• Suporte sempre disponível\n• 99,9% de tempo online\n\n🔹 Caso tenha qualquer dúvida sobre a forma de pagamento ou queira mais detalhes sobre nossos planos, clique no botão abaixo e fale diretamente com o nosso suporte. Estamos aqui para ajudar!"
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: ".assinarpro",
                title: "🌸 Assinar Pro"
              }
            },
            {
              type: "reply",
              reply: {
                id: ".assinarmestre",
                title: "🪷 Assinar Mestre"
              }
            },
            {
              type: "reply",
              reply: {
                id: ".suporte",
                title: "💬 Falar com Suporte"
              }
            }
          ]
        }
      }
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'ERRO no .beneficiosPlanos' });
    })
    .catch((err) => console.error(err.response?.data || err.response || err));
}

const assinePro = async (req) => {
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
      type: 'text',
      text: {
        preview_url: true,
        body: "🌸 Então você decidiu ser Pro?\n\nObrigado por fazer parte 💖\n\nCom o plano Pro, você vai ter figurinhas ilimitadas, comandos avançados, modo conversa, atualizações exclusivas e suporte prioritário!\n\n👉 Acesse agora e faça sua assinatura pelo link abaixo:\nhttps://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n\nAssim que o pagamento for aprovado, você receberá um código. Envie aqui no chat *.cupom [SEU CÓDIGO DE COMPRA]* (exemplo: .cupom ABC123)\n\n💌 Qualquer dúvida, é só chamar!"
      }
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'ERRO no .assinePro' });
    })
    .catch((err) => console.error(err.response?.data || err.response || err));
}

const assineMaster = async (req) => {
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
      type: 'text',
      text: {
        preview_url: true,
        body: "🌸 Então você decidiu ser Mestre?\n\nObrigado por fazer parte 💖\n\nCom o plano Mestre, você desbloqueia TUDO do Pro + funções exclusivas como StickerAI, ImagemIA, conversa avançada com IA e novidades antes de todo mundo.\n\n👉 Acesse agora e faça sua assinatura pelo link abaixo:\nhttps://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\nAssim que o pagamento for aprovado, você receberá um código. Envie aqui no chat *.cupom [SEU CÓDIGO DE COMPRA]* (exemplo: .cupom ABC123)\n\n💌 Qualquer dúvida, é só chamar!"
      }
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'ERRO no .assinePro' });
    })
    .catch((err) => console.error(err.response?.data || err.response || err));
}


const manualPremiumActivation = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const commands = payload?.messages[0]?.text?.body.split(' ');
  if (commands.length !== 4 || (commands[2] !== 'premium' && commands[2] !== 'basico')) return sendAdmin('Erro: Utilize o comando', ADMIN_CMD_ADDPREMIUM, '[wa_id] [premium/basico] [dias], como no exemplo: ', ADMIN_CMD_ADDPREMIUM, '554899787078 basico 30')
  const today = new Date();
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + Number(commands[3]))
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
  if (!newPremiumUser) return sendAdmin('Erro: Usu�rio n�o existe no banco de dados. Verificar wa_id.');
  await senpaiMongoDb.collection('premium').findOneAndUpdate(
    { wa_id: commands[1] },
    {
      $set: {
        ...newPremiumUser,
        premium: true,
        subscription: {
          type: commands[2],
          start: today,
          end: expirationDate
        }
      }
    },
    { upsert: true }
  )
    .then(res => sendAdmin('Conta premium concedida!'))
    .catch(err => console.error('Erro salvando usuario na collection premium'));
  return;
}

module.exports = {
  getPremiumUsers,
  getAllUsers,
  limitedStickerPremiumPlan,
  premiumPlans,
  manualPremiumActivation,
  beneficiosPlanos,
  assinePro,
  assineMaster
}