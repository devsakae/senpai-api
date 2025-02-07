const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoclient = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  await mongoclient.connect();
})()

const senpaiMongoDb = mongoclient.db('senpai');

module.exports = {
  senpaiMongoDb,
}