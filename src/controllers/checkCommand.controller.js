const { canal } = require('../templates');
const { rootMenu } = require('../templates/list');
const { staticSticker, stickerTutorial } = require('../templates/sticker');
const { noGrace } = require('../utils');

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (today.getTime() - new Date(sender.last_contact).getTime() > 86400000) {
    console.log('usuário sem contato há 24h+');
    return await rootMenu(payload.contacts[0]);
  }
  return console.info(
    'o que fazer? usuário mandou:',
    payload.messages[0]?.type,
  );
};

const checkCommand = async (sender, req) => {
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  if (user_sent?.type === 'text') {
    if (user_sent?.text?.body === '.canal') return await canal(req);
    if (user_sent?.text?.body === '.suporte')
      return console.log('user requested .suporte!');
    if (user_sent?.text?.body === '.sobre')
      return console.log('user requested .sobre!');
    if (user_sent?.text?.body === '.sticker' || user_sent?.text?.body === '.s')
      return stickerTutorial(req);
  }
  if (user_sent?.type === 'image') {
    if (sender.last_type === 'image' && noGrace(sender.last_contact)) return await 
    console.info(sender?.name, 'sent image id', user_sent?.image?.id);
    return await staticSticker(req);
  }
  return checkLastInteraction(sender, req);
};

module.exports = {
  checkLastInteraction,
  checkCommand,
};
