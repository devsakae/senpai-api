const { canal, sobre } = require('../templates');
const { limitedStickers } = require('../templates/errors');
const { rootMenu } = require('../templates/list');
const { staticSticker, stickerTutorial } = require('../templates/sticker');
const { onGrace } = require('../utils');
const { getSuporte } = require('./suporte.controller');

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (today.getTime() - new Date(sender.last_contact).getTime() > 86400000) {
    return await rootMenu(payload.contacts[0]);
  }
  await checkCommand(sender, req);
};

const checkCommand = async (sender, req) => {
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  console.log(sender.name, 'sent', user_sent.text?.body);
  if (user_sent?.type === 'text') {
    if (user_sent?.text?.body === '.canal') return await canal(req);
    if (user_sent?.text?.body === '.suporte') return await getSuporte(req);
    if (user_sent?.text?.body === '.sobre') return await sobre(req);
    if (user_sent?.text?.body === '.menu' || user_sent?.text?.body === '.m') return await rootMenu(req.body.entry[0]?.changes[0]?.value?.contacts[0]);
    if (user_sent?.text?.body === '.sticker' || user_sent?.text?.body === '.s')
      return await stickerTutorial(req);
  }
  if (user_sent?.type === 'image') {
    if (sender.last_type === 'image' && onGrace(sender.last_contact)) return await limitedStickers(req);
    console.info(sender?.name, 'sent image id', user_sent?.image?.id);
    return await staticSticker(req);
  }
  return console.log(sender.name, 'sent command:', user_sent?.text?.body || '[unkown]');
};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
