const { randomArr } = require("../../utils/randomArr");
const { getDotyApi } = require("./apis");
const { googleTranslate } = require("../../utils/googletranslate");

const daysOfTheYearApi = async () => {
  const doty = await getDotyApi();
  if (doty.length === 0) return "";
  const filteredDoty = doty.filter((days) => days.type === 'day')
  const { name, excerpt } = randomArr(filteredDoty);
  const translateThis = name + ' - ' + sliceExceprt(excerpt);
  const translated = await googleTranslate({ query: translateThis, source: 'en', target: 'pt-BR' }) || ""
  return translated;
}

const sliceExceprt = (excerpt) => {
  if (excerpt.length < 300) return excerpt;
  const newExcerpt = excerpt.slice(0,300);
  return newExcerpt.slice(0,newExcerpt.lastIndexOf(".") + 1);
}

module.exports = { 
  daysOfTheYearApi,
}