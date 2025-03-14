const { default: axios } = require('axios');
const { randomizeThis, msg_bom_dia } = require('../templates/info');
const { googleTranslate } = require('../utils/googletranslate');
const { DOTY_APIKEY, VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID } = process.env

const bomDia = async () => {
  const today = new Date();
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
    `Desejamos tudo de bom pra você nessa ${hojeMonth}.`
  ];

  const doty = await dayOfTheYear() || '';
  const msg_positividade = randomizeThis(msg_bom_dia);
  const msg_bomdia = randomizeThis(hojePreface);
  const msg_aniversariante = await getWishiy();

  const msg_final = msg_bomdia + " " + msg_positividade + "\n\n" + doty + "\n\n" + msg_aniversariante;

  /* return msg_final; */
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
      to: process.env.BOT_ADMIN_WAID,
      type: 'text',
      text: {
        preview_url: false,
        body: msg_final,
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar' });
    })
    .catch(err => console.error(err.response?.data || err));
}

const getDoty = async () => {
  return await axios({
    method: 'GET',
    url: 'https://www.daysoftheyear.com/api/v1/today/?timezone_offset=-3',
    headers: {
      'X-Api-Key': DOTY_APIKEY
    },
  }).then((res) => {
    if (res.data.code === 200) return res.data.data;
    else throw new Error({ data: 'Erro ao buscar Days of the Year' })
  }).catch((err) => {
    console.error('Erro getting DOTY', err)
    return err.data || err;
  })
}

const dayOfTheYear = async () => {
  const doty = await getDoty();
  const filteredDoty = doty.filter((days) => days.type === 'day')
  const { name, excerpt } = filteredDoty[Math.floor(Math.random() * filteredDoty.length)]
  const translateThis = name + ' - ' + excerpt;
  const translated = await googleTranslate({ query: translateThis, source: 'en', target: 'pt-BR' })
  return translated;
}

const allWishiyes = async () => {
  return await axios({
    method: 'POST',
    url: 'https://wishiy.com/api/today',
    data: {
      limit: 7,
      response: "json"
    }
  }).then((res) => res.data)
    .catch((err) => console.error(err.data || err));
}

const getWishiy = async () => {
  const wishiyes = await allWishiyes();
  const wishiy = randomizeThis(wishiyes);
  const jobTranslated = await googleTranslate({ query: wishiy?.occupation, target: 'pt-br', source: 'en' }) || "pessoa";
  const g1 = wishiy?.gender === 'male' ? 'e' : 'a' || 'e';
  const g2 = wishiy?.gender === 'male' ? 'o' : 'a' || 'o';
  // 🎈🎁🎏🎀🪅🎊🎉
  const hojeAniversario = [
    `🎈🎁🎏 Quem apaga as velinhas hoje é ${wishiy.name} (${jobTranslated}) 🎀🪅🎊🎉`,
    `Aniversário de nascimento de ${wishiy.name}, ${jobTranslated}. Eis aí nosso presente: 🎁`,
    `🎈🎈 Mais um ano de vida para ${g2} ${jobTranslated} ${wishiy.name}! Parabéns pra você, nessa data querida!`,
    `É um dia especial para ${wishiy.name}, excelente ${jobTranslated} que comemora mais um ano de vida hoje.`,
    `Os parabéns de hoje vão para ${wishiy.name}, ${jobTranslated} que apaga as velinhas 🎉🎉🎉 por mais um ano.`,
    `${wishiy.name}, renomad${g2} ${jobTranslated} faz aniversário 🎈 hoje. Conhece mais alguém que faz?`,
    `Lembrança especial para ${g2} maior ${jobTranslated} chamad${g2} ${wishiy.name}, que faz aniversário hoje. 🎈🎈🎈`,
    `Parabéns pra você, nessa data querida! Muitas felicidades, muitos anos de vida! ${g2.toUpperCase()} ${wishiy.name} faz anos, que el${g1} seja feliz! Parabéns para ${g2} ${wishiy.name}, que el${g1} seja feliz!`,
    `🪅🎊🎈 É dia de festa para ${g2} memorável ${jobTranslated} *${wishiy.name}*, que comemora mais uma volta ao sol hoje!`,
    `Sabia que ${g2} ${jobTranslated} ${g1} comemora aniversário 🎁🎁🎁 hoje? Os nossos parabéns especiais a el${1} e a todos que ficam mais velhos hoje.`
  ]
  return randomizeThis(hojeAniversario);
}

module.exports = {
  bomDia
}