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
    msg_final = msg_final + "\n\n" + randomArr(topicPreface);
    msg_final = msg_final + "\n\n" + `▪️ ${msg_topic_news.data[0].title} (${msg_topic_news.data[0].publisher.name.toUpperCase()})\n\n`    
    const randomHeadlines = msg_topic_news.data.filter((d, i) => (Math.floor(Math.random() * 2) === 0 && i > 0) && d);
    randomHeadlines.forEach((headline) => msg_final = msg_final + `▪️ ${headline.title} (${headline.publisher.name.toUpperCase()})\n\n`);
  }

  const msg_fato_inutil = await getUselessFact();
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