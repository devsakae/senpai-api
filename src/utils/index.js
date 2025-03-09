const checkAndLog = (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  if (payload?.statuses) return console.log(payload?.statuses[0]?.status, 'status for', payload?.statuses[0]?.id);
  if (payload?.messages) {
    const { profile: { name }, wa_id } = payload?.contacts[0];
    const msg_type = payload?.messages[0]?.type || 'unknown';
    if (msg_type === 'text') return console.info(payload?.messages[0]?.timestamp, wa_id, name, 'sent text:', payload?.messages[0]?.text?.body)
    if (msg_type === 'image') return console.info(payload?.messages[0]?.timestamp, wa_id, name, 'sent', payload?.messages[0]?.image?.mime_type, '#id:', payload?.messages[0]?.image?.id);
    if (msg_type === 'video') return console.info(payload?.messages[0]?.timestamp, wa_id, name, 'sent', payload?.messages[0]?.video?.mime_type, '#id:', payload?.messages[0]?.video?.id);
    if (msg_type === 'interactive') {
      let interactiveType = payload?.messages[0]?.type === 'interactive' && payload?.messages[0]?.interactive?.type;
      return console.info(payload?.messages[0]?.timestamp, wa_id, name, 'reply with', payload?.messages[0]?.interactive[interactiveType]?.id || payload?.messages[0]?.id)
    }
    if (msg_type === 'button') {
      return console.info(payload?.messages[0]?.timestamp, wa_id, name, 'clicked on button', payload?.messages[0]?.button?.payload);
    }
    else return console.error(wa_id, name, 'sent something different...')
  }
}

// returns true if user last contact was more than 24 hours
const onGrace = (last_time) => {
  return (new Date() - last_time) > 86400000
}

// returns true if user last contact was less than 24 hours
const onProb = (last_time) => {
  return (new Date() - last_time) < 86400000
}

module.exports = {
  checkAndLog,
  onGrace,
  onProb,
};
