const { checkCupom } = require('../assinaturas');
const { canal, sobre, privacy } = require('../templates');
const { oneStickerAtTime } = require('../templates/errors');
const { rootMenu, completeMenu } = require('../templates/list');
const { staticSticker, stickerTutorial, dynamicSticker, freeUserStickerLimit } = require('../templates/sticker');
const { getFeedbackResponse, flow_feedback, flow_premium_activation, getPremiumActivationPayload, flow_lembrete } = require('./flow.controller');
const { premiumPlans } = require('./premium.controller');
const { getSuporte } = require('./suporte.controller');
const { googleThis } = require('../premium/google');
const { getStickerWa } = require('../premium/stickerpack');
const { getGeminiResponse } = require('../premium/gemini');
const { createStickerWithGemini } = require('../premium/stickerai');

const checkLastInteraction = async (user, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  const timestampToTime = payload?.messages[0]?.timestamp * 1000;
  if (
    payload?.messages &&
    (today.getTime() - timestampToTime) > 86400000 // Mais de um 1 dia?
  ) {
    return await rootMenu(payload.contacts[0]);
  }
  if (
    payload?.messages &&
    (today.getTime() - timestampToTime) < 60 // Mensagens enviadas com menos de 1 segundo de diff?
  ) {
    return console.info(`👀 ${user?.name} enviou multiplas msg em menos de 1 segundo`)
  }
  return await checkCommand(user, req);
};

const checkCommand = async (user, req) => {

  const today = new Date();
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];

  if (user_sent?.type === 'button' && user_sent?.button?.payload === 'Possuo um Código') {
    return await flow_premium_activation(req);
  }

  if (user_sent?.type === 'text' || user_sent?.type === 'interactive') {
    let interactiveType =
      (user_sent?.type === 'interactive' &&
        user_sent?.interactive[user_sent?.interactive?.type]?.id) ||
      '';

    // premium:start
    if (user.premium && user_sent?.text?.body.startsWith('.sticker ')) {
      if (user_sent?.text?.body.split(".sticker ")[1].length > 0) return await getStickerWa(req);
      return await stickerTutorial(req);
    }
    if (user.premium && user?.subscription?.type === "premium" && user_sent?.text?.body.startsWith('.stickerai ')) {
      if (user_sent?.text?.body.split(".stickerai ")[1].length > 0) return await createStickerWithGemini(req);
      return await stickerTutorial(req);
    }
    // premium:end

    if (interactiveType.startsWith('.getpremium')
      || interactiveType === '.getpremium'
      || user_sent?.text?.body.startsWith('.getpremium')
      || user_sent?.text?.body.includes('Quero ser Premium!'))
      return await premiumPlans(req);

    // tester:start
    if (user.tester && user_sent?.text?.body.startsWith('.lembrete ')) return await flow_lembrete(req);
    // tester:end

    if (interactiveType === '.feedback')
      return await flow_feedback(req);

    if (user_sent?.interactive?.type === 'nfm_reply') {
      const responseJson = JSON.parse(user_sent?.interactive?.nfm_reply?.response_json);
      if (responseJson.flow_token === 'questionario') return await getFeedbackResponse(req);
      if (responseJson.flow_token === 'premiumactivation') return await getPremiumActivationPayload(req);
    }
    // flows:end

    if (user_sent?.text?.body === '.canal' || interactiveType === '.canal')
      return await canal(req);

    if (user_sent?.text?.body === '.suporte' || interactiveType === '.suporte') {
      // if (user.premium) return await getPremiumSuporte(req);
      return await getSuporte(req);
    }
    if (user_sent?.text?.body === '.sobre' || interactiveType === '.sobre')
      return await sobre(req);

    if (
      user_sent?.text?.body === '.menu' ||
      user_sent?.text?.body === '.m' ||
      interactiveType === '.menu'
    ) {
      if (user.premium) return await completeMenu(req);
      return await rootMenu(req.body.entry[0]?.changes[0]?.value?.contacts[0]);
    }

    if (
      user_sent?.text?.body === '.sticker' ||
      user_sent?.text?.body === '.s' ||
      interactiveType === '.sticker'
    )
      return await stickerTutorial(req);

    if (user_sent?.text?.body.length > 7 &&
      user_sent?.text?.body.startsWith('.cupom '))
      return await checkCupom(
        user_sent?.text?.body,
        req.body.entry[0]?.changes[0]?.value?.contacts[0],
      );

    if (user_sent?.text?.body === '.privacy' || interactiveType === '.privacy')
      return await privacy(req);

    if (user_sent?.text?.body.startsWith('.google')) {
      return await googleThis(req);
    }

    if (
      user_sent?.text?.body.startsWith('.') ||
      user_sent?.text?.body.startsWith('/')
    )
      return console.info(user.name, 'tried command', user_sent?.text?.body);

    if (user.premium && user?.subscription?.type === "premium") return await getGeminiResponse(req);

    return;
  }

  // if (user_sent?.type === 'image') {
  //   const userLastImageSentDatetime = new Date(user?.last_time.image);
  //   if (
  //     ((today.getTime() - userLastImageSentDatetime.getTime() < 86400000)
  //       && !user.premium)
  //   ) {
  //     console.error(today.toISOString(), '🚫', user.name, 'allowed for 1 sticker only.');
  //     return await freeUserStickerLimit(req);
  //   }
  //   if (user_sent?.timestamp - 3 < user.last_time?.timestamp) {
  //     console.error(today.toISOString(), '🚫', user.name, 'allowed for 1 sticker only.')
  //     return await oneStickerAtTime(req);
  //   }
  //   if (user_sent?.type === 'image') return await staticSticker(req);
  //   if (user_sent?.type === 'video') return await dynamicSticker(req)
  // }

  if (user_sent?.type === 'image' || user_sent?.type === 'video') {
    const userLastImageSentDatetime = new Date(user?.last_time.image);
    const userLastVideoSentDatetime = new Date(user?.last_time.video);
    if (
      ((today.getTime() - userLastImageSentDatetime.getTime() < 86400000
        || today.getTime() - userLastVideoSentDatetime.getTime() < 86400000)
        && !user.premium)
    ) {
      console.error(today.toISOString(), '🚫', user.name, 'allowed for 1 sticker only.');
      return await freeUserStickerLimit(req);
    }
    if (user_sent?.timestamp - 3 < user.last_time?.timestamp) {
      console.error(today.toISOString(), '🚫', user.name, 'allowed for 1 sticker only.')
      return await oneStickerAtTime(req);
    }
    if (user_sent?.type === 'image') return await staticSticker(req);
    if (user_sent?.type === 'video') return await dynamicSticker(req)
  }

};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
