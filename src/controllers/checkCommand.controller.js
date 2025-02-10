const checkCommand = async (req) => {
  console.log('checking command...');
  // const payload = req.body.entry[0]?.changes[0]?.value;

  // if (new Date(payload?.messages[0]?.timestamp - 86400000))

  // if (payload?.messages[0]?.text?.body === '.canal') return await canal(req);
  // return rootMenu(contact);
}

module.exports = {
  checkCommand,
}