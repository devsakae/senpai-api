const { default: axios } = require('axios');
const { msg_bom_dia } = require('../templates/newsletter');
const { daysOfTheYearApi, getWishiy, getRandomTopic, getUselessFact } = require('./newsletter');
const { randomArr } = require('../utils/randomArr');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, ADMIN_WAID } = process.env
const admins = ADMIN_WAID.split(',');

const bomDia = async () => {
  console.info("*** Iniciando processo da newsletter...")

  const today = new Date();
  let imgURL = "";

  const hojeYear = today.toLocaleDateString('pt-br', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hojeMonth = today.toLocaleDateString('pt-br', {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  const hojeWeekday = today.toLocaleDateString('pt-br', {
    weekday: "long"
  })

  const hojePreface = [
    `Hoje é ${hojeYear}.`,
    `Finalmente é ${hojeMonth}!`,
    `Olá! Hoje é ${hojeYear}.`,
    `Bom dia. Hoje é ${hojeYear}.`,
    `Preparado para encarar esta ${hojeWeekday}?`,
    `Chegamos na ${hojeYear}...`,
    `Pronto para enfrentar esta ${hojeWeekday}?`,
    `Segure minha mão e vamos juntos encarar esta ${hojeMonth}.`,
    `Marque no seu calendário! Hoje é ${hojeYear}.`,
    `Nessa ${hojeWeekday}, desejamos o melhor pra você!`,
    `Hoje é dia do abraço!! (mentira, hoje é ${hojeWeekday}).`,
    `Pois olha ela, a ${hojeMonth}!`,
    `Quem diria que chegaríamos inteiros na ${hojeYear}?`,
    `Muito mais que bom dia para esta ${hojeYear}.`,
    `Aquele nosso bom dia especial pra você nessa ${hojeMonth}.`,
    `Desejamos tudo de bom pra você nessa ${hojeMonth}.`,
    `Com muito suor, chegamos no dia de hoje, ${hojeMonth}.`
  ];

  const doty = await daysOfTheYearApi() || '';
  console.info("✔️  daysOfTheYear");

  const msg_aniversariante = await getWishiy();
  console.info("✔️  wishiy");

  const msg_positividade = randomArr(msg_bom_dia);
  const msg_bomdia = randomArr(hojePreface);

  let msg_final = msg_bomdia + " " + msg_positividade + "\n\n" + msg_aniversariante + "\n\n🟢 *Hoje*: " + doty;

  const msg_topic_news = await getRandomTopic();
  console.info("✔️  randomTopic");

  if (msg_topic_news.data.length > 0) {
    const topicPreface = [
      "Comece o dia bem informado com as notícias a seguir:",
      "Leia as notícias de hoje e avise seus amigos que foi um bot quem te informou (jura):",
      "Pronto para se atualizar? As notícias quentinhas já chegaram!",
      "Notícias fresquinhas, como pão saído do forno. Aproveite!",
      "Se o dia fosse um filme, essas notícias seriam os spoilers que você precisa!",
      "Notícias quentes, mas sem queimar os dedos. Vamos lá!",
      "Prepare o café e se acomode, porque as notícias estão prontas para você:",
      "Se informação fosse vitamina, você estaria prestes a ficar super saudável...!",
      "Notícias frescas, direto da redação para o seu cérebro curioso:",
      "Hoje tem notícia boa, ruim e aquela que vai te deixar pensando. Duvida? Pois eu também.",
      "Notícias que valem mais que um like. Dê uma olhada:",
      "As melhores chamadas da imprensa hoje estão aqui no nosso resumo diário:",
      "Se o mundo fosse um livro, essas seriam as páginas que você não pode pular:",
      "Notícias que vão te deixar mais esperto que um rato de biblioteca:",
      "Aqui estão as notícias que vão te deixar no clima de 'um bot me falou isso às 7h30min'!",
      "Notícias que vão te deixar mais informado que um papagaio tagarela.",
      "Prepare-se para uma overdose de informação (do bem, claro)!",
      "Notícias que vão te deixar mais afiado que um lápis recém-apontado:",
      "Se informação fosse dinheiro, você estaria prestes a ficar rico:",
      "Notícias que vão te deixar mais esperto que um esquilo estocado:",
      "Um copo de café, uma lista de manchetes e você recomendando o Bot Senpai pra todo mundo = Fórmula perfeita 🥰",
      "Novidades que vão te deixar mais conectado que eu em você ♥️",
      "Notícias que vão te deixar mais sabido que um rato de laboratório:",
      "Aqui estão as notícias que vão te deixar mais sabido que um cientista maluco:",
      "Notícias que vão te deixar mais esperto que um macaco de filme de ação:",
      "Prepare-se para uma dose diária de notícias que vão te deixar mais informado que velha fofoqueira!",
      "Notícias que vão te deixar mais esperto que um detetive de filme noir:",
      "Notícias que vão te deixar mais ligado que um fio de alta tensão:"
    ];
    msg_final = msg_final + "\n\n" + randomArr(topicPreface) + "\n";
    msg_final = msg_final + "\n" + `▪️ ${msg_topic_news.data[0].title} (${msg_topic_news.data[0].publisher.name.toUpperCase()})\n\n`
    const randomHeadlines = msg_topic_news.data.filter((d, i) => (Math.floor(Math.random() * 2) === 0 && i > 0) && d);
    randomHeadlines.forEach((headline) => msg_final = msg_final + `▪️ ${headline.title} (${headline.publisher.name.toUpperCase()})\n\n`);
  }

  const msg_fato_inutil = await getUselessFact();
  console.info("✔️  getUselessFact");
  msg_final = msg_final + msg_fato_inutil;

  console.log('*** 👁‍🗨 enviando bom dia para admins/premium...', msg_final);
  await Promise.all(admins.map(async (adm) => await sendBomDia({ to: adm, text: "`[ADMIN ONLY --- MODO DE TESTE]`\n" + msg_final, image: imgURL })))
  // await sendBomDia({ to: process.env.BOT_ADMIN_WAID, text: msg_final + '\n\n' + imgURL, image: imgURL });

}

const sendBomDia = async (payload) => {
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload.to,
      type: 'text',
      text: {
        preview_url: false,
        body: payload.text,
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ data: 'Erro no envio. Retorno != 200' });
    })
    .catch(err => console.error(err?.data || err));
}

module.exports = {
  bomDia
}