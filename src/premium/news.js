const { randomizeThis } = require("../templates/info")

const topics = ["Lifestyle", "Business", "Entertainment", "General", "Health", "Science", "Technology", "World"]
const subtopics = [
  "entertainment",
  "arts",
  "books",
  "celebrities",
  "gaming",
  "movies",
  "music",
  "tv",
  "general",
  "fitness",
  "lifestyle",
  "beauty",
  "cooking",
  "fashion",
  "tourism",
  "science",
  "climate",
  "environment",
  "genetics",
  "geology",
  "physics",
  "space",
  "wildlife",
  "technology",
  "esports",
  "ai",
  "computing",
  "cybersec",
  "gadgets",
  "internet",
  "mobile",
  "robot",
  "vr",
  "world",
  "culture",
  "history"
]

const getRandomTopic = async () => {
  let randomTopic = ""
  randomTopic = randomizeThis(topics);
  response = await getNewsApi(randomTopic);
  return { topic: randomTopic, data: response };
}

const getRandomSubtopic = async () => {
  let randomSubtopic = "";
  randomSubtopic = randomizeThis(subtopics);
  response = await getNewsApi(randomSubtopic);
  return { topic: randomSubtopic, data: response };
}

const getNewsApi = async (topic) => {
  let response = "";
  response = await axios({
    method: 'GET',
    hostname: 'news-api14.p.rapidapi.com',
    port: null,
    path: `/v2/trendings?topic=${topic}&language=pt&country=br&limit=5`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
  }).then((res) => res.success && res.data)
  .catch((err) => console.error(err.data || err));
  return response;

}

module.exports = {
  getNewsApi,
  getRandomTopic,
  getRandomSubtopic,
}