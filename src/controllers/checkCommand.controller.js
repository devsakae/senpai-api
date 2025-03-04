const { checkCupom } = require('../assinaturas');
const { canal, sobre, privacy } = require('../templates');
const { limitedStickers, oneStickerAtTime } = require('../templates/errors');
const { rootMenu, completeMenu } = require('../templates/list');
const { staticSticker, stickerTutorial } = require('../templates/sticker');
const { getSuporte, getPremiumSuporte, flow_feedback } = require('./suporte.controller');

const checkLastInteraction = async (user, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (
    payload?.messages &&
    (today.getTime() - (payload?.messages[0]?.timestamp * 1000)) > 86400000
  ) {
    return await rootMenu(payload.contacts[0]);
  }
  if (
    payload?.messages &&
    today.getTime() - payload?.messages[0]?.timestamp > 60
  ) {
    return await checkCommand(user, req);
  }
};

const checkCommand = async (user, req) => {
  const today = new Date();
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  if (user_sent?.type === 'text' || user_sent?.type === 'interactive') {
    let interactiveType =
      (user_sent?.type === 'interactive' &&
        user_sent?.interactive[user_sent?.interactive?.type]?.id) ||
      '';
    if (
      user_sent?.text?.body === 'Quero ser Premium!' ||
      interactiveType === 'getpremium'
    ) {
      console.log('Usuário quer ser premium');
      return 
    }

    if (interactiveType === '.feedback')
      return await flow_feedback(req);

    if (user_sent?.text?.body === '.canal' || interactiveType === '.canal')
      return await canal(req);
    
    if (user_sent?.text?.body === '.suporte' || interactiveType === '.suporte') {
      if (user.premium) return await getPremiumSuporte(req);
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
        user_sent?.text?.body.startsWith('.cupom'))
      return await checkCupom(
        user_sent?.text?.body,
        req.body.entry[0]?.changes[0]?.value?.contacts[0],
      );

    if (user_sent?.text?.body === '.privacy' || interactiveType === '.privacy')
      return await privacy(req);

    if (
      user_sent?.text?.body.startsWith('.') ||
      user_sent?.text?.body.startsWith('/')
    )
      return console.info(user.name, 'tried command', user_sent?.text?.body);

    return;
  }
  if (user_sent?.type === 'image') {
    
    if (
      today.getTime() - new Date(user.last_time.image).getTime() < 86400000 &&
      !user.premium
    ) {
      console.error('🚫', user.name, 'allowed for 1 sticker only.');
      return await limitedStickers(req);
    }

    if (user_sent?.timestamp - 3 < user.last_time?.timestamp) {
      return await oneStickerAtTime(req);
    }

    return await staticSticker(req);
  }
};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
