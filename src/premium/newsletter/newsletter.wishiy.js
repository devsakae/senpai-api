const { getWishiyApi } = require("./apis");
const { randomArr } = require("../../utils/randomArr");
const { googleTranslate } = require("../../utils/googletranslate");

const getWishiy = async () => {
  const wishiyes = await getWishiyApi();
  const wishiy = randomArr(wishiyes);
  const jobTranslated = await googleTranslate({ query: wishiy?.occupation, target: 'pt-br', source: 'en' }) || "pessoa";
  const g1 = wishiy?.gender === 'male' ? 'e' : 'a' || 'x';
  const g2 = wishiy?.gender === 'male' ? 'o' : 'a' || 'x';

  const hojeAniversario = [
    `?????? Quem apaga as velinhas hoje é ${wishiy.name} (${jobTranslated}) ????????`,
    `Aniversário de nascimento de ${wishiy.name}, ${jobTranslated}. Eis aí nosso presente: ??`,
    `???? Mais um ano de vida para ${g2} ${jobTranslated} ${wishiy.name}! Parabéns pra você, nessa data querida!`,
    `É um dia especial para ${wishiy.name}, excelente ${jobTranslated} que comemora mais um ano de vida hoje.`,
    `Os parabéns de hoje vão para ${wishiy.name}, ${jobTranslated} que apaga as velinhas ?????? por mais um ano.`,
    `${wishiy.name}, renomad${g2} ${jobTranslated} faz aniversário ?? hoje. Conhece mais alguém que faz?`,
    `Lembrança especial para ${g2} maior ${jobTranslated} chamad${g2} ${wishiy.name}, que faz aniversário hoje. ??????`,
    `Parabéns pra você, nessa data querida! Muitas felicidades, muitos anos de vida! ${g2.toUpperCase()} ${wishiy.name} faz anos, que el${g1} seja feliz! Parabéns para ${g2} ${wishiy.name}, que el${g1} seja feliz!`,
    `?????? É dia de festa para ${g2} memorável ${jobTranslated} *${wishiy.name}*, que comemora mais uma volta ao sol hoje!`,
    `Sabia que ${g2} ${jobTranslated} ${wishiy.name} comemora aniversário ?????? hoje? Os nossos parabéns especiais a el${g1} e a todos que ficam mais velhos hoje.`
  ]
  return randomArr(hojeAniversario);
}

module.exports = {
  getWishiy,
}