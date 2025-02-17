const { default: axios } = require("axios")
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;
const limitedStickersMessages = [
  "Parece que alguém está ansioso para stickerizar! Calma, amigo, você só pode enviar 1 imagem a cada 24 horas. O sticker mágico precisa de um tempinho para recarregar as energias!",
  "Whoa, whoa, whoa! Um sticker por dia mantém o tédio longe! Você já fez sua boa ação stickerística hoje. Volte amanhã para mais uma dose de diversão!",
  "Parece que você encontrou o limite de stickers diários! Não se preocupe, o sticker factory está em manutenção. Tente novamente em 24 horas para mais adesivos incríveis!",
  "Você já usou seu superpoder de sticker hoje! Ative o modo paciência e volte amanhã para continuar sua missão de stickerizar o mundo!",
  "Ops! O sticker-ômetro está indicando que você já atingiu o limite diário. Mas não se preocupe, o sticker fairy estará de volta em 24 horas para mais magia!"
];

const limitedStickers = async (req) => {
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
      to: req.body?.entry[0]?.changes[0]?.value?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: limitedStickersMessages[Math.floor(Math.random() * limitedStickersMessages.length)],
      },
    },
  })
}

module.exports = {
  limitedStickers,
}