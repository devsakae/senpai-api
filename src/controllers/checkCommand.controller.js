const { canal, sobre } = require('../templates');
const { limitedStickers } = require('../templates/errors');
const { rootMenu } = require('../templates/list');
const { staticSticker, stickerTutorial } = require('../templates/sticker');
const { getSuporte } = require('./suporte.controller');

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (today.getTime() - new Date(sender.last_contact).getTime() > 86400000 &&
      !sender.premium) {
    return await rootMenu(payload.contacts[0]);
  }
  await checkCommand(sender, req);
};

const checkCommand = async (sender, req) => {
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  if (user_sent?.type === 'text') {
    if (user_sent?.text?.body === '.canal' || user_sent?.interactive?.button_reply?.title === '.canal') return await canal(req);
    if (user_sent?.text?.body === '.suporte' || user_sent?.interactive?.button_reply?.title === '.suporte') return await getSuporte(req);
    if (user_sent?.text?.body === '.sobre' || user_sent?.interactive?.button_reply?.title === '.sobre') return await sobre(req);
    if (user_sent?.text?.body === '.menu'  || user_sent?.text?.body === '.m' || user_sent?.interactive?.button_reply?.title === '.menu') return await rootMenu(req.body.entry[0]?.changes[0]?.value?.contacts[0]);
    if (user_sent?.text?.body === '.sticker' || user_sent?.text?.body === '.s' || user_sent?.interactive?.button_reply?.title === '.sticker' )
      return await stickerTutorial(req);
  }
  if (user_sent?.type === 'image') {
    if (sender.last_type === 'image') return await limitedStickers(req);
    return await staticSticker(req);
  }
};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
