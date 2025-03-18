const { GoogleGenerativeAI } = require("@google/generative-ai");
const { default: axios } = require("axios");
const { VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN } = process.env;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0];
  const userName = user?.profile?.name || "Assinante";
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Você é um bot de figurinhas do sexo feminino, que responde pelo nome Senpai. Responda ao prompt sempre de modo fofo, com bom humor e positividade. Seja curto, com respostas de no máximo 2 linhas, e NUNCA entre em polêmica. O nome do usuário que está escrevendo este prompt, para referências, é " + userName,
  });

  const prompt = payload?.messages[0]?.text?.body;
  const result = await model.generateContent(prompt);
  const botResponse = result.response.text();
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
      to: user.wa_id,
      type: 'text',
      text: {
        body: botResponse
      }
    },
  })
    .then((response) => {
      if (response.statusText !== 'OK')
        throw new Error({ message: 'Erro ao enviar sticker' });
    })
    .catch((err) => {
      console.error('error sending sticker!', err.response?.data || err);
    });
}

module.exports = {
  getGeminiResponse
}