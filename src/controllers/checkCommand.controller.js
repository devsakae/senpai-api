const { canal } = require("../templates");
const { rootMenu } = require("../templates/list");

const checkLastInteraction = async (sender, req) => {
  const today = new Date();
  const payload = req.body.entry[0]?.changes[0]?.value;
  if ((today.getTime() - new Date(sender.last_contact).getTime() > 86400000) ) {
    console.log('usuário sem contato há 24h+')
    return await rootMenu(payload.contact[0]);
  }
  return console.info('o que fazer? usuário mandou:', payload.messages[0].text.body);
}

const checkCommand = async (req) => {  
  const cmdList = ['.canal', '.suporte', '.sobre'];
  const user_msg = req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body
  if (!cmdList.includes(user_msg)) return false;

  if (user_msg === '.canal') return await canal(req);
  if (user_msg === '.suporte') return console.log('.suporte');
  if (user_msg === '.sobre') return console.log('.sobre');
}

module.exports = {
  checkLastInteraction,
  checkCommand,
}