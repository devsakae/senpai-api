const { checkCupom } = require('../assinaturas');
const { canal, sobre, privacy } = require('../templates');
const { limitedStickers } = require('../templates/errors');
const { rootMenu, completeMenu } = require('../templates/list');
const { staticSticker, stickerTutorial } = require('../templates/sticker');
const { getSuporte } = require('./suporte.controller');

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (
    payload?.messages &&
    today.getTime() - payload?.messages[0]?.timestamp * 1000 > 86400000
  ) {
    return await rootMenu(payload.contacts[0]);
  }
  if (
    payload?.messages &&
    today.getTime() - payload?.messages[0]?.timestamp > 60
  ) {
    return await checkCommand(sender, req);
  }
};

const checkCommand = async (user, req) => {
  const today = new Date();
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  if (user_sent?.type === 'text' || user_sent?.type === 'interactive') {
    if (
      user_sent?.text?.body === 'Quero ser Premium!' ||
      user_sent?.interactive?.button_reply?.id === 'getpremium'
    ) {
      return console.log('Usuário quer ser premium');
    }

    if (
      user_sent?.text?.body === '.canal' ||
      user_sent?.interactive?.button_reply?.id === '.canal'
    )
      return await canal(req);
    if (
      user_sent?.text?.body === '.suporte' ||
      user_sent?.interactive?.button_reply?.id === '.suporte'
    )
      return await getSuporte(req);
    if (
      user_sent?.text?.body === '.sobre' ||
      user_sent?.interactive?.button_reply?.id === '.sobre'
    )
      return await sobre(req);

    if (
      user_sent?.text?.body === '.menu' ||
      user_sent?.text?.body === '.m' ||
      user_sent?.interactive?.button_reply?.id === '.menu'
    ) {
      if (user.premium) return await completeMenu(req);
      return await rootMenu(req.body.entry[0]?.changes[0]?.value?.contacts[0]);
    }

    if (
      user_sent?.text?.body === '.sticker' ||
      user_sent?.text?.body === '.s' ||
      user_sent?.interactive?.button_reply?.id === '.sticker'
    )
      return await stickerTutorial(req);

    if (user_sent?.text?.body.startsWith('.cupom'))
      return await checkCupom(
        user_sent?.text?.body,
        req.body.entry[0]?.changes[0]?.value?.contacts[0],
      );

    if (
      user_sent?.text?.body === '.privacy' ||
      user_sent?.interactive?.button_reply?.id === '.privacy'
    )
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
      console.error('⛔️', user.profile?.name, 'allowed for 1 sticker only.');
      return await limitedStickers(req);
    }
    return await staticSticker(req);
  }
};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
