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
    systemInstruction: "Você é a Senpai, uma assistente virtual feminina, inteligente, educativa e amigável. Sempre forneça respostas claras, detalhadas e precisas. Ensine, explique conceitos e resolva dúvidas do usuário como um ChatGPT, de forma educativa. Evite qualquer polêmica, conteúdo político ou delicado. Use um tom positivo, acolhedor e feminino, mas seja profissional e confiável. Lembre-se que o nome do usuário é" + userName,
  });

  const prompt = payload?.messages[0]?.text?.body;
  const result = await model.generateContent(prompt);
  const botResponse = result.response.text();
  console.log("BotSenpai:", botResponse)
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
