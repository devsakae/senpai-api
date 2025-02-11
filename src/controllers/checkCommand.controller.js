const { canal } = require("../templates");
const { rootMenu } = require("../templates/list");
const { staticSticker, stickerTutorial } = require("../templates/sticker");

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if ((today.getTime() - new Date(sender.last_contact).getTime() > 86400000) ) {
    console.log('usuário sem contato há 24h+')
    return await rootMenu(payload.contact[0]);
  }
  return console.info('o que fazer? usuário mandou:', payload.messages[0].text.body);
}

const checkCommand = async (sender, req) => {  
  const user_sent = req.body.entry[0]?.changes[0]?.value?.messages[0];
  console.log(user_sent);
  if (user_sent?.type === 'text') {
    if (user_sent?.text?.body === '.canal') return await canal(req);
    if (user_sent?.text?.body === '.suporte') return console.log('user requested .suporte!');
    if (user_sent?.text?.body === '.sobre') return console.log('user requested .sobre!');
    if (user_sent?.text?.body === '.figurinha') return stickerTutorial(req);
  }
  if (user_sent?.type === 'image') {
    console.info(user_sent?.image);
    // if (user_sent?.image?.caption === '.figurinha') return await staticSticker(req);
  }
  return checkLastInteraction(sender, req);
}

module.exports = {
  checkLastInteraction,
  checkCommand,
}