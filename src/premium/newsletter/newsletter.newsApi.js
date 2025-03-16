const { randomArr } = require("../../utils/randomArr");
const { getNewsApi } = require("../news");

const topics = [
  { id: "entertainment", name: "Entretenimento" },
  { id: "technology", name: "Tecnologia" },
  { id: "general", name: "Notícias" },
  { id: "world", name: "Notícias" }
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
  { id: "ai", name: "Intelig�ncia Artificial" },
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
  randomTopic = randomArr(topics);
  response = await getNewsApi(randomTopic.id);
  return { topic: randomTopic.name, data: response };
}

const getRandomSubtopic = async () => {
  let randomSubtopic = "";
  randomSubtopic = randomArr(subtopics);
  response = await getNewsApi(randomSubtopic.id);
  return { topic: randomSubtopic.name, data: response };
}


module.exports = {
  getRandomTopic,
  getRandomSubtopic,
}