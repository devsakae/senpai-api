const { default: axios } = require('axios');
const { randomizeThis } = require('../templates/info');
const { googleTranslate } = require('../utils/googletranslate');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleGenAI } = require('@google/genai');
const FormData = require('form-data');
const { RAPIDAPI_KEYS, STICKERAI_API, STICKERAI_HOST, VERSION, PHONE_NUMBER_ID, GRAPH_API_TOKEN, API_URL, GOOGLE_API_KEY } = process.env;
const rapidkeys = RAPIDAPI_KEYS.split(",");
const styles = [40, 41, 42, 43, 44, 45];

const createStickerWithImagen = async (req) => {
  const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
  const payload = req.body.entry[0]?.changes[0]?.value
  const user = payload.contacts[0]?.wa_id
  const userPhone = "+" + payload.messages[0].from
  const originalPrompt = payload.messages[0]?.text?.body.split(".imagem ")[1]
  const translatePrompt = await googleTranslate({ query: originalPrompt, source: "pt-BR", target: "en" }) || "japanese girl with pink hair and blue laces saying 'Desculpe, não entendi'";
  const promptTranslated = translatePrompt;
  console.log('[.imagem] gerando imagem com o prompt', promptTranslated, "(" + originalPrompt + ")")
  await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: promptTranslated,
    config: {
      numberOfImages: 1,
    },
  })
    .then(async response => {
      const localBuffer = Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');
      const destDir = './media/' + user;
      const webpFilename = "imagen3-generated-" + new Date().getTime();
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
      const filePath = path.join(destDir, webpFilename + ".png");
      fs.writeFileSync(filePath, localBuffer);
      const imagemURL = `${API_URL}/media/${user}/${webpFilename}.png`;
      console.log("[.imagem] gerada:", imagemURL);
      const formData = new FormData();
      const myFile = fs.createReadStream(filePath);
      formData.append('messaging_product', 'whatsapp');
      formData.append('file', myFile);
      formData.append('type', 'image/png');
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/media`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
      }).then(async res => {
        console.log('[.imagem] enviada para servidor da Meta com id:', res.data.id);
        if (res.statusText !== 'OK') throw new Error({ message: '[.imagem] erro ao realizar upload de imagem criada com Imagen3.' });
        return await axios({
          method: 'POST',
          url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/media`,
          headers: {
            Authorization: `Bearer ${GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          data: {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: userPhone,
            type: 'image',
            image: {
              id: res.data.id,
              caption: originalPrompt
            },
          },
        }).then(res => console.log("[.imagem] enviado!"))
          .catch(err => console.error("[.imagem/erro] envio user", Object.keys(err.response.data), err.response.data));
      }).catch(err => console.error("[.imagem/erro] upload imagem", Object.keys(err.response.data), err.response.data))

    })
    .catch(err => console.error(err))
}

const createStickerWithGemini = async (req) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const payload = req.body.entry[0]?.changes[0]?.value
  const user = payload.contacts[0]?.wa_id
  const originalPrompt = payload.messages[0]?.text?.body.split(".stickerai ")[1]
  const translatePrompt = await googleTranslate({ query: originalPrompt, source: "pt-BR", target: "en" }) || "japanese girl with pink hair and blue laces saying 'Desculpe, não entendi o idioma'";
  const promptTranslated = "generate a sticker 512x512 of this: " + translatePrompt;
  console.log('[.stickerai] iniciando geração sticker para o prompt', promptTranslated)

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      responseModalities: ['Text', 'Image']
    },
  });

  try {
    const response = await model.generateContent(promptTranslated);
    for (const part of response.response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
        const userErrorGenerating = part.text || "Houve um erro ao gerar sua imagem. Você pode tentar com outro prompt?"
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
            to: user,
            type: 'text',
            text: {
              preview_url: true,
              body: userErrorGenerating,
            },
          },
        })
          .then((response) => {
            if (response.statusText !== 'OK')
              throw new Error({ response: { data: 'retorno statusText !== OK' } });
            return console.log("[.stickerai] enviada para user!");
          })
          .catch((err) => {
            console.error('[.stickerai] erro enviando sticker!', err.response?.data || err);
          });
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        const destDir = './media/' + user;
        const webpFilename = "ai-generated-" + new Date().getTime();
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
        const filePath = path.join(destDir, webpFilename + ".webp");
        await sharp(buffer)
          .resize(512, 512, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .toFile(filePath)
          .then(async (res) => {
            console.log("[.stickerai] sticker gerada! enviando...");
            const stickerURL = `${API_URL}/media/${user}/${webpFilename}.webp`;
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
                to: user,
                type: 'sticker',
                sticker: {
                  link: stickerURL,
                },
              },
            })
              .then((response) => {
                if (response.statusText !== 'OK')
                  throw new Error({ response: { data: 'retorno statusText !== OK' } });
                return console.log("[.stickerai] enviada para user!");
              })
              .catch((err) => {
                console.error('[.stickerai] erro enviando sticker!', err.response?.data || err);
              });
          })
        console.log('[.stickerai] imagem enviada!')
      }
    }
  } catch (error) {
    console.error("[.stickerai] erro gerando imagem!", error);
  }

}

const getStickerAi = async (tl, req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const wa_id = payload?.contact[0].wa_id;
  let prompt = payload?.messages[0]?.text?.body || 'create a random sticker';
  if (tl) {
    // prompt = await googleTranslate({ }); 
  }
  const promptResponse = await inputPrompt(prompt);

}

const inputPrompt = async (prompt) => {
  const apikey = randomizeThis(rapidkeys);
  const style = randomizeThis(styles);
  await axios({
    method: 'POST',
    url: STICKERAI_API,
    headers: {
      'x-rapidapi-key': apikey,
      'x-rapidapi-host': STICKERAI_HOST
    },
    data: {
      prompt: prompt,
      style_id: style,
      size: '1-1'
    }
  })
}

module.exports = {
  getStickerAi,
  createStickerWithImagen,
  createStickerWithGemini,
}