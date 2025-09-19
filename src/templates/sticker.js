const { default: axios } = require('axios');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { randomizeThis, msg_sticker, msg_limitsticker } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, API_URL } = process.env;

const stickerTutorial = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;
  const sticker_message = randomizeThis(msg_sticker) || 'Para receber uma sticker, envie uma imagem pra mim! :)';

  try {
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}`, 'Content-Type': 'application/json' },
      data: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: user,
        type: 'text',
        text: { body: sticker_message },
      },
    });

    if (response.status !== 200 || response.statusText !== 'OK') {
      console.error(`[STICKER TUTORIAL] Falha ao enviar mensagem para ${user}:`, response.data);
    } else {
      console.info(`[STICKER TUTORIAL] Mensagem enviada com sucesso para ${user}`);
    }
  } catch (err) {
    console.error(`[STICKER TUTORIAL] Erro ao enviar mensagem para ${user}:`, err.response?.data || err.message);
  }
};

const staticSticker = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;

  try {
    const mediaInfo = await getMedia(payload?.messages[0]?.image?.id);
    const mediaBuffer = await getMediaBuffer(mediaInfo.url);
    const localBuffer = Buffer.from(mediaBuffer, 'base64');
    const destDir = './media/' + user;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
    const filePath = path.join(destDir, mediaInfo.id + '.webp');

    await sharp(localBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(filePath);

    const stickerURL = `${API_URL}/media/${user}/${mediaInfo.id}.webp`;
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}`, 'Content-Type': 'application/json' },
      data: { messaging_product: 'whatsapp', recipient_type: 'individual', to: user, type: 'sticker', sticker: { link: stickerURL } },
    });

    if (response.statusText !== 'OK') {
      console.error(`[STATIC STICKER] Falha ao enviar sticker para ${user}:`, response.data);
    } else {
      console.info(`[STATIC STICKER] Sticker enviado com sucesso para ${user}`);
    }
  } catch (err) {
    console.error(`[STATIC STICKER] Erro ao processar ou enviar sticker para ${user}:`, err.response?.data || err.message);
  }
};

const dynamicSticker = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;

  try {
    const message = payload?.messages[0];
    const videoMime = message?.video?.mime_type;
    const mediaId = message?.video?.id;

    if (!videoMime || !mediaId) {
      console.warn(`[DYNAMIC STICKER] Nenhum vídeo válido recebido de ${user}`);
      return;
    }

    const mediaExt = videoMime.split('/')[1];
    if (!['mp4', 'webm'].includes(mediaExt)) {
      console.warn(`[DYNAMIC STICKER] Formato de vídeo não suportado (${mediaExt}) por ${user}`);
      return;
    }

    const mediaInfo = await getMedia(mediaId);
    const mediaBuffer = Buffer.from(await getMediaBuffer(mediaInfo.url), 'base64');

    const destDir = `./media/${user}`;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);

    const rawFile = path.join(destDir, `${mediaInfo.id}-raw.${mediaExt}`);
    const cleanedFile = path.join(destDir, `${mediaInfo.id}-clean.${mediaExt}`);
    const outputWebp = path.join(destDir, `${mediaInfo.id}.webp`);

    fs.writeFileSync(rawFile, mediaBuffer);

    // Remove metadados do vídeo
    // await removeExifFromVideo(rawFile, cleanedFile).then(() => {
    //  fs.unlinkSync(rawFile);
    // })

    // Converte vídeo em WebP animado compatível WhatsApp
    await new Promise((resolve, reject) => {
      ffmpeg(rawFile)
        .setStartTime(0)
        .setDuration(3) // duração máxima 3s
        .outputOptions([
          '-loop 0', // loop infinito
          '-map_metadata -1', // remove metadados
          '-vcodec libwebp',
          '-compression_level 3', // compressão máxima segura
          '-preset default',
          '-vf scale=512:512:force_original_aspect_ratio=decrease,fps=10'
        ])
        .noAudio()
        .output(outputWebp)
        .on('end', () => {
          const stats = fs.statSync(outputWebp);
          console.info(`[DYNAMIC STICKER] WebP gerado para ${user} - ${Math.round(stats.size/1024)} KB`);
          if(stats.size > 500*1024){
            console.warn(`[DYNAMIC STICKER] Sticker acima de 500 KB, pode falhar no envio.`);
          }
          resolve();
        })
        .on('error', (err) => {
          console.error(`[DYNAMIC STICKER] Erro ao gerar sticker animado para ${user}:`, err.message);
          reject(err);
        })
        .run();
    }).then(() => {
      fs.unlinkSync(rawFile);
    });

    // Envia sticker
    const stickerURL = `${API_URL}/media/${user}/${mediaInfo.id}.webp`;
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}`, 'Content-Type': 'application/json' },
      data: { messaging_product: 'whatsapp', recipient_type: 'individual', to: user, type: 'sticker', sticker: { link: stickerURL } },
    });

    if (response.statusText === 'OK') {
      console.info(`[DYNAMIC STICKER] Sticker animado enviado com sucesso para ${user}`);
    } else {
      console.error(`[DYNAMIC STICKER] Falha ao enviar sticker animado para ${user}:`, response.data);
    }

  } catch (err) {
    console.error(`[DYNAMIC STICKER] Erro ao processar sticker animado para ${user}:`, err.response?.data || err.message);
  }
};



function removeExifFromVideo(inputVideo, outputVideo) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputVideo)
      .outputOptions('-map_metadata', '-1')
      .on('end', () => {
        console.info(`[REMOVE EXIF] EXIF removido com sucesso de ${inputVideo}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`[REMOVE EXIF] Erro ao remover EXIF de ${inputVideo}:`, err.message);
        reject(err);
      })
      .save(outputVideo);
  });
}

const freeUserStickerLimit = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;

  try {
    let limited_sticker = randomizeThis(msg_limitsticker);
    limited_sticker += "\n\nPróximo sticker a partir de " + new Date((payload?.messages[0]?.timestamp * 1000) + 86400000);

    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}`, 'Content-Type': 'application/json' },
      data: { messaging_product: 'whatsapp', recipient_type: 'individual', to: user, type: 'text', text: { body: limited_sticker } },
    });

    if (response.status !== 200 || response.statusText !== 'OK') {
      console.error(`[FREE LIMIT] Falha ao enviar mensagem de limite para ${user}:`, response.data);
    } else {
      console.info(`[FREE LIMIT] Mensagem de limite enviada com sucesso para ${user}`);
    }
  } catch (err) {
    console.error(`[FREE LIMIT] Erro ao processar mensagem de limite para ${user}:`, err.response?.data || err.message);
  }
};

const getMedia = async (imageId) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://graph.facebook.com/${VERSION}/${imageId}?phone_number_id=${PHONE_NUMBER_ID}`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}` },
    });
    return response.data;
  } catch (err) {
    console.error(`[GET MEDIA] Erro ao obter URL da mídia ${imageId}:`, err.response?.data || err.message);
  }
};

const getMediaBuffer = async (mediaUrl) => {
  try {
    const response = await axios({ method: 'GET', url: mediaUrl, headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}` }, responseType: 'arraybuffer' });
    return response.data;
  } catch (err) {
    console.error(`[GET MEDIA BUFFER] Erro ao obter buffer da mídia ${mediaUrl}:`, err.response?.data || err.message);
  }
};

const sendMediaIdToUser = async (mediaId, userId) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}` },
      data: { messaging_product: 'whatsapp', to: userId, type: 'sticker', sticker: { id: mediaId } },
    });
    console.info(`[SEND MEDIA] Sticker enviado com sucesso para ${userId}`);
    return response.data;
  } catch (err) {
    console.error(`[SEND MEDIA] Erro ao enviar sticker para ${userId}:`, err.response?.data || err.message);
  }
};

module.exports = {
  stickerTutorial,
  staticSticker,
  dynamicSticker,
  freeUserStickerLimit,
};
