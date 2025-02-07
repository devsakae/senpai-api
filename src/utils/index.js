
const { VERSION, GRAPH_API_TOKEN } = process.env;

const jsonHeaders = (wamid) => ({
  method: "POST",
  url: `https://graph.facebook.com/${VERSION}/${wamid}/messages`,
  headers: {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

module.exports = {
  jsonHeaders,
}