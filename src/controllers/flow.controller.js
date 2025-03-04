const { sendAdmin } = require("../utils/sender");

const getFeedbackResponse = async (req) => {
  const payload = JSON.parse(req.body.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.nfm_reply?.response_json);
  const contact = req.body.entry[0]?.changes[0]?.value?.contacts[0];
  let response = 'Flow *' + payload?.flow_token + '* enviado por ' + contact.profile.name + ' (' + contact.wa_id + '):\n\n';
  Object.entries(payload).forEach((k, v) => response = response + '\n- ' + k + ': ' + v);
  console.log(response);
  await sendAdmin(response);
}

module.exports = {
  getFeedbackResponse,
}