const { GoogleGenerativeAI } = require("@google/generative-ai")


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        maxOutputTokens: 100,
        temperature: 1.5,
        topP: 0.9,
        topK: 50,
        presencePenalty: 0.4,
        frequencyPenalty: 0.4
    }
})

const randomJokes = async () => {
    const prompt = "Gere uma piada tão engraçada que faria até uma estátua gargalhar. Use um humor afiado e surpreendente.";

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = await response.text()
    return text

}

const themedJokes = async (theme) => {
    const prompt = `Desafie as leis do humor e crie a piada mais engraçada do universo sobre ${theme}. Use um humor inteligente, surpreendente e que arranque risadas instantâneas.`;

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = await response.text()
    return text

}

module.exports = {
    randomJokes,
    themedJokes
}