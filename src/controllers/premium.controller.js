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
          text: '🎁 Quer mais?',
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
                title: '💎 Ativar VIP',
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
          text: "🌸 Torne-se VIP da Senpai!"
        },
        body: {
          text: "💎 O que você ganha:\n✅ Figurinhas *sem limites*\n✅ Colocar a *Senpai* no seu grupo\n✅ Conversar com a *Senpai como ChatGPT*\n✅ Vários *recursos e comandos exclusivos*\n\n🌟 Planos disponíveis:\n- *VIP Pro* → R$ 4,90 (30 dias)\n- *VIP Mestre (para grupo)* → R$ 9,90 (30 dias)\n\n💳 Formas de pagamento:\n\n🔹 *Pix* – funciona em qualquer banco ou carteira digital (Caixa, Itaú, Bradesco, Nubank, PicPay, Mercado Pago, etc)\n📌 Chave: *pix@botdosenpai.com.br*\n👤 Titular: *Marcelo Pinho de Oliveira*\n\n🔹 *Cartão de crédito (Mercado Pago):*\n👉 [VIP Pro] https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n👉 [VIP Mestre] https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\n📌 Depois de pagar, clique em *✅ Já paguei* abaixo para liberar seu VIP.\n\n❓ Em caso de dúvida, clique no botão *❓ Suporte* e vamos te ajudar."
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: ".ativarpremium",
                title: "✅ Já paguei"
              }
            },
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
                title: "❓ Suporte"
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
          text: "🎀 Benefícios"
        },
        body: {
          text: "🌸 *VIP Pro* – R$ 4,90/mês\n• *Figurinhas sem limites* – Crie e envie quantas quiser, sem restrições!\n• *Converse com a Senpai* – Tire dúvidas e tenha um bate-papo interativo, quase como ter sua própria assistente AI!\n\n🪷 *VIP Mestre* – R$ 9,90/mês\nPerfeito para donos de grupos grandes que querem mais *controle*, *segurança* e *diversão*:\n• *Gerenciamento completo* do grupo\n• *Editor* e *Conversor de Figurinhas*\n• *Moderação avançada* e *Antilink automático*\n• *Horário programado* e *boas-vindas automáticas*\n• *Mini jogos* e comandos dinâmicos\n• Baixe vídeos do Instagram e Twitter\n• *Figurinhas com fundo transparente*\n• *Atualizações semanais*\n\n💬 *Suporte sempre disponível* – 99,9% do tempo online\n\n💳 *Pagamentos via Pix (mais rápido)*: pix@botdosenpai.com.br\n\n🔹 Para pagar com cartão de crédito, clique no botão correspondente abaixo:\n\n🌸 *Cartão Pro*\n🪷 *Cartão Mestre*\n\n❓ Em caso de dúvida, clique no botão *Suporte* e vamos te atender!"
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: ".assinarpro",
                title: "🌸 Cartão Pro"
              }
            },
            {
              type: "reply",
              reply: {
                id: ".assinarmestre",
                title: "🪷 Cartão Mestre"
              }
            },
            {
              type: "reply",
              reply: {
                id: ".suporte",
                title: "❓ Falar com Suporte"
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

const ativarPremium = async (req) => {
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
        body: "💙 Ative seu *VIP* em poucos minutos!\n\nSe você já fez a assinatura pelo *Mercado Pago* ou *PIX*, siga este passo a passo:\n\n1️⃣ Abra o aplicativo do *Mercado Pago*\n2️⃣ Localize o *comprovante da assinatura*\n3️⃣ Copie o *número da transação* (exemplo: _12345_)\n4️⃣ Envie aqui no WhatsApp usando o comando:\n\n.cupom 12345\n\n📌 Substitua o número acima pelo código da sua transação!\n\n⏳ Assim que você enviar, *nossa equipe irá analisar*.Esse processo pode levar *alguns minutinhos* até a liberação.\n\n✅ Após a validação, a *Bot do Senpai* vai liberar automaticamente *todos os benefícios VIP* 💎\n\n💬 Dúvidas? Chame o suporte, estamos prontos para ajudar!"
      }
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'ERRO no .ativarPremium' });
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
        body: "🌸 Que alegria ter você como *Pro!* 💖\n\nObrigado por apoiar a *Bot do Senpai* ✨\n\n👉 Ative seu *VIP* pelo link:\n🔗 https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380849564460a0195691fcd1802b6\n\n📌 Assim que o pagamento for aprovado, você receberá um *código de compra*.\nEnvie aqui no chat:\n\n.cupom SEU-CÓDIGO\n(exemplo: .cupom ABC123)\n\n💌 Qualquer dúvida, é só chamar!"
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
        body: "🌸 Que alegria ter você como *Mestre!* 💖\n\nObrigado por apoiar a *Bot do Senpai* ✨\n\n👉 Ative seu *VIP* pelo link:\n🔗 https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084943cdeb601943d5af5f8005c\n\n📌 Assim que o pagamento for aprovado, você receberá um *código de compra*.\nEnvie aqui no chat:\n\n.cupom SEU-CÓDIGO\n(exemplo: .cupom ABC123)\n\n💌 Qualquer dúvida, é só chamar!"
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
  ativarPremium,
  assinePro,
  assineMaster
}
