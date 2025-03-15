const { randomizeThis } = require("../templates/info");
const { default: axios } = require("axios");

const topics = [
  { id: "gaming", name: "Jogos" },
  { id: "music", name: "Música" },
  { id: "climate", name: "Clima" },
  { id: "movies", name: "Filmes" }
];

const subtopics = [
  { id: "entertainment", name: "Entretenimento" },
  { id: "arts", name: "Artes" },
  { id: "books", name: "Livros" },
  { id: "celebrities", name: "Celebridades" },
  { id: "gaming", name: "Jogos" },
  { id: "movies", name: "Filmes" },
  { id: "music", name: "Música" },
  { id: "tv", name: "Televisão" },
  { id: "general", name: "Geral" },
  { id: "fitness", name: "Fitness" },
  { id: "lifestyle", name: "Estilo de Vida" },
  { id: "beauty", name: "Beleza" },
  { id: "cooking", name: "Culinária" },
  { id: "fashion", name: "Moda" },
  { id: "tourism", name: "Turismo" },
  { id: "science", name: "Ciência" },
  { id: "climate", name: "Clima" },
  { id: "environment", name: "Meio Ambiente" },
  { id: "genetics", name: "Genética" },
  { id: "geology", name: "Geologia" },
  { id: "physics", name: "Física" },
  { id: "space", name: "Espaço" },
  { id: "wildlife", name: "Vida Selvagem" },
  { id: "technology", name: "Tecnologia" },
  { id: "esports", name: "e-Sports" },
  { id: "ai", name: "Inteligência Artificial" },
  { id: "computing", name: "Computação" },
  { id: "cybersec", name: "Cybersegurança" },
  { id: "gadgets", name: "Dispositivos" },
  { id: "internet", name: "Internet" },
  { id: "mobile", name: "Celulares" },
  { id: "robot", name: "Robótica" },
  { id: "vr", name: "Realidade Virtual" },
  { id: "world", name: "Mundo" },
  { id: "culture", name: "Cultura" },
  { id: "history", name: "História" }
];


const getRandomTopic = async () => {
  let randomTopic = ""
  randomTopic = randomizeThis(topics);
  response = await getNewsApi(randomTopic.id);
  return { topic: randomTopic.name, data: response };
}

const getRandomSubtopic = async () => {
  let randomSubtopic = "";
  randomSubtopic = randomizeThis(subtopics);
  response = await getNewsApi(randomSubtopic.id);
  return { topic: randomSubtopic.name, data: response };
}

const getNewsApi = async (topic) => {
  let response = [];
  response = await axios({
    method: 'GET',
    url: 'https://news-api14.p.rapidapi.com/v2/trendings',
    params: {
      topic: topic,
      language: "pt",
      country: "br",
      limit: 5
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
  }).then((res) => res.data.success && res.data.data)
  .catch((err) => console.error(err.data || err));
  
  return response;
}

module.exports = {
  getNewsApi,
  getRandomTopic,
  getRandomSubtopic,
}