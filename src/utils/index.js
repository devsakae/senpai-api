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

module.exports = {
  jsonHeaders,
  metaHeaders,
};
