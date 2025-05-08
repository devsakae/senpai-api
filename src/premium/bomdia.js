const { default: axios } = require('axios');
const { msg_bom_dia, msg_noticias_preambulo, msg_fato_inutil, msg_friday_streaming_now } = require('../templates/newsletter');
const { daysOfTheYearApi, getWishiy, getRandomTopic, getUselessFact } = require('./newsletter');
const { randomArr } = require('../utils/randomArr');
const { getAdviceSlip } = require('./newsletter/newsletter.adviceSlip');
const { getWatchmodeApiDay, getWatchmodeStreaming, srd, sourceType } = require('./newsletter/newsletter.watchmode');
const { sendNewsletter } = require('../utils/sender');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, ADMIN_WAID } = process.env
const admins = ADMIN_WAID.split(',');

const bomDia = async () => {
  const today = new Date();
  console.info('Preparando newsletter para', today.toLocaleDateString('pt-br'))

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
  const hojeDayMonth = today.toLocaleDateString('pt-br', {
    month: "long",
    day: "numeric"
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

  const msg_positividade = randomArr(msg_bom_dia);
  const msg_preface = randomArr(hojePreface);
  let msg_final = msg_preface + " " + msg_positividade;

  console.info("*** Enviando newsletter de bom dia")
  console.info(msg_final);
  
  const feature_phrases = ["advice", "uselessfact"];
  const feature_phrase = randomArr(feature_phrases);
  console.info("destaque de hoje:", feature_phrase);
  if (feature_phrase === "advice") {
    const response_advice = await getAdviceSlip();
    console.info("✔️  adviceSlip", response_advice?.substring(0,50));
    if (response_advice) msg_final = msg_final + "\n\n> " + response_advice;
  }
  if (feature_phrase === "uselessfact") {
    const response_fato_inutil = await getUselessFact();
    console.info("✔️  getUselessFact", response_fato_inutil?.substring(0,50));
    if (response_fato_inutil) msg_final = msg_final + "\n\n> " + randomArr(msg_fato_inutil) + response_fato_inutil;  
  }

  // Deprecado em abril/25
  // if (feature_phrase === "wishiy") {
  //   const response_wishiy = await getWishiy() || ""; 
  //   console.info("✔️  wishiy", response_wishiy?.substring(0,50));
  //   if (response_wishiy) msg_final = msg_final + "\n\n> " + response_wishiy;
  // }
  
  const response_doty = await daysOfTheYearApi() || "";
  console.info("✔️  daysOfTheYear", response_doty?.substring(0,50));
  if (response_doty) msg_final = msg_final + "\n\n" + hojeDayMonth + " - " + response_doty;
  
  const response_news_by_topic = await getRandomTopic();
  if (response_news_by_topic.data.length > 0) {
    console.info("✔️  randomTopic");
    msg_final = msg_final + "\n\n" + randomArr(msg_noticias_preambulo) + "\n";
    msg_final = msg_final + "\n" + `- ${response_news_by_topic.data[0].title} (${response_news_by_topic.data[0].publisher.name.toUpperCase()})`
    const randomHeadlines = response_news_by_topic.data.filter((d, i) => {
      if (Math.floor(Math.random() * 2) === 0 && i > 0) return d;
    });
    randomHeadlines.forEach((headline) => msg_final = msg_final + `\n- ${headline.title} (${headline.publisher.name.toUpperCase()})`);
  }

  if (today.getDay() === 5) {
    const watchmode_preface = randomArr(msg_friday_streaming_now);
    const releases = await getWatchmodeApiDay();
    const netflix_releases = getWatchmodeStreaming("Netflix", releases);
    const disney_releases = getWatchmodeStreaming("Disney", releases);
    const prime_releases = getWatchmodeStreaming("Amazon", releases);
    const apple_releases = getWatchmodeStreaming("Apple", releases);
    if (netflix_releases || disney_releases || prime_releases || apple_releases) {
      msg_final = msg_final + "\n\n" + watchmode_preface;
      if (apple_releases.length > 0) {
        msg_final = msg_final + "\n\n⚫️⚪️ Apple TV";
        apple_releases.forEach(e => msg_final = msg_final + "\n- " + e.title + " (" + srd(e?.source_release_date) + ") " + sourceType(e?.tmdb_type));
      }
      if (disney_releases.length > 0) {
        msg_final = msg_final + "\n\n🔵⚪️ Disney+";
        disney_releases.forEach(e => msg_final = msg_final + "\n- " + e.title + " (" + srd(e?.source_release_date) + ") " + sourceType(e?.tmdb_type));
      }
      if (netflix_releases.length > 0) {
        msg_final = msg_final + "\n\n🔴⚪️ Netflix";
        netflix_releases.forEach(e => msg_final = msg_final + "\n- " + e.title + " (" + srd(e?.source_release_date) + ") " + sourceType(e?.tmdb_type));
      }
      if (prime_releases.length > 0) {
        msg_final = msg_final + "\n\n⚪️🔵 Prime Video";
        prime_releases.forEach(e => msg_final = msg_final + "\n- " + e.title + " (" + srd(e?.source_release_date) + ") " + sourceType(e?.tmdb_type));
      }
    }
  }

  console.log('*** 👁‍🗨 enviando bom dia para admins/premium...');
  await sendNewsletter(msg_final);
  // await sendBomDia({ to: process.env.BOT_ADMIN_WAID, text: msg_final });

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