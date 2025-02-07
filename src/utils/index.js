
const { VERSION, GRAPH_API_TOKEN } = process.env;

const jsonHeaders = (wa_id) => ({
  method: "POST",
  url: `https://graph.facebook.com/${VERSION}/${wa_id}/messages`,
  headers: {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

module.exports = {
  jsonHeaders,
}