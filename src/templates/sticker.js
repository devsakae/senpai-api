const { default: axios } = require('axios');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
// const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { randomizeThis, msg_sticker, msg_limitsticker, msg_size_errors } = require('./info');
const { VERSION, GRAPH_API_TOKEN, PHONE_NUMBER_ID, API_URL } = process.env;

const stickerTutorial = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const sticker_message =
    randomizeThis(msg_sticker) ||
    'Para receber uma sticker, envie uma imagem pra mim! :)';
  await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: sticker_message,
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar stickerTutorial' });
    })
    .catch((err) => console.error(err.response));
};

const staticSticker = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;
  const userName = payload?.contacts[0]?.profile?.name;
  const userPhone = payload?.metadata?.display_phone_number;
  const mediaInfo = await getMedia(payload?.messages[0]?.image?.id);
  const mediaBuffer = await getMediaBuffer(mediaInfo.url);
  const localBuffer = Buffer.from(mediaBuffer, 'base64');
  const destDir = './media/' + user;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
  const filePath = path.join(destDir, mediaInfo.id + '.webp');
  await sharp(localBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(filePath);

  // const sticker = new Sticker(filePath, {
  //   pack: `🇯🇵 Created by ${userName.length > 3 && userName !== "" ? userName : userPhone}`,
  //   author: "Senpai Bot",
  //   type: StickerTypes.FULL,
  //   quality: 100,
  // });

  // await sticker.toFile(filePath)

  const stickerURL = `${API_URL}/media/${user}/${mediaInfo.id}`;
  await axios({
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
        throw new Error({ message: 'Erro ao enviar sticker' });
    })
    .catch((err) => {
      console.error('error sending sticker!', err.response?.data || err);
    });
};

const dynamicSticker = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  const user = payload?.contacts[0]?.wa_id;
  const mediaInfo = await getMedia(payload?.messages[0]?.video?.id);
  const mediaBuffer = await getMediaBuffer(mediaInfo.url);
  const localBuffer = Buffer.from(mediaBuffer, "base64");
  const destDir = './media/' + user;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
  const tempFile = path.join(destDir, mediaInfo.id + ".mp4")
  const filePath = path.join(destDir, mediaInfo.id + '.webp');
  fs.writeFileSync(tempFile, localBuffer)
  ffmpeg(localBuffer)
    .setStartTime(0)
    .setDuration(6)
    .output(filePath)
    .videoCodec("libwebp")
    .size("512x512")
    .fps(10)
    .noAudio()
    .on('end', async () => {

      const stats = fs.statfsSync(filePath)
      const sizeInKb = stats.size / 1024

      if (sizeInKb >= 500) {
        const errorMessage = randomizeThis(msg_size_errors);
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
              body: errorMessage
            },
          },
        }).then(res => console.log('sending error about sticker size'))
          .catch(err => console.error('error sending error about sticker size', err.data || err));
      }
      const stickerURL = `${API_URL}/media/${user}/${mediaInfo.id}`;
      await axios({
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
            throw new Error({ message: 'Erro ao enviar sticker animado.' });
        })
      return console.info('sticker animado enviado!')
        .catch((err) => {
          console.error('error sending sticker!', err.response?.data || err);
        })
    })
    .on('error', () => console.error('Erro gerando sticker animado.'))
    .run()
}

const freeUserStickerLimit = async (req) => {
  const payload = req.body.entry[0]?.changes[0]?.value;
  let limited_sticker = randomizeThis(msg_limitsticker);
  limited_sticker = limited_sticker + "\n\nPróximo sticker a partir de " + new Date((payload?.messages[0]?.timestamp * 1000) + 86400000)
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
      to: payload?.contacts[0]?.wa_id,
      type: 'text',
      text: {
        body: limited_sticker,
      },
    },
  })
    .then((response) => {
      if (response.status !== 200 || response.statusText !== 'OK')
        throw new Error({ response: 'Erro ao enviar freeUserStickerLimit' });
    })
    .catch((err) => console.error(err.response?.data || err));
};

const getMedia = async (imageId) => {
  return await axios({
    method: 'GET',
    url: `https://graph.facebook.com/${VERSION}/${imageId}?phone_number_id=${PHONE_NUMBER_ID}`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
  })
    .then((response) => response.data)
    .catch((err) => console.error('Error getting URL', err.code));
};

const getMediaBuffer = async (mediaUrl) => {
  return await axios({
    method: 'GET',
    url: mediaUrl,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    responseType: 'arraybuffer',
  })
    .then((response) => response.data)
    .catch((err) => console.error('error media buffer', err.code));
};

const sendMediaIdToUser = async (mediaId, userId) => {
  return await axios({
    method: 'POST',
    url: `https://graph.facebook.com/${VERSOPM}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: 'whatsapp',
      to: userId,
      type: 'sticker',
      sticker: {
        id: mediaId,
      },
    },
  })
    .then((response) => {
      console.log('sticker sent ok!', response.data);
    })
    .catch((err) =>
      console.error('error sending sticker', err.response?.data || err),
    );
};

module.exports = {
  stickerTutorial,
  staticSticker,
  dynamicSticker,
  freeUserStickerLimit,
};
