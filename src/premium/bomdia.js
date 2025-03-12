const { default: axios } = require('axios');
const { DOTY_APIKEY } = process.env

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

const bomDia = async () => {
  const doty = await getDoty();
  const filteredDoty = doty.filter((days) => days.type === 'day')
  console.log(filteredDoty);
}

module.exports = {
  bomDia,
}