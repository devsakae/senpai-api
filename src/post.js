const { VERSION, GRAPH_API_TOKEN } = process.env;

const metaHeadersById = (business_phone_number_id) => ({
  method: "POST",
  url: `https://graph.facebook.com/${VERSION}/${business_phone_number_id}/messages`,
  headers: {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  }
});

module.exports = {
  metaHeadersById,
}