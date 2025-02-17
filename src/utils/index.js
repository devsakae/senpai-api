const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env;

const jsonHeaders = {
  method: 'POST',
  url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
  headers: {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

const metaHeaders = {
  method: 'POST',
  url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
  headers: {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  },
};

// returns true if user last contact was more than 24 hours
const onGrace = (last_time) => {
  return (today - last_time) > 86400000
}

// returns true if user last contact was less than 24 hours
const onProb = (last_time) => {
  return (today - last_time) < 86400000
}

module.exports = {
  jsonHeaders,
  metaHeaders,
  onGrace,
  onProb,
};
