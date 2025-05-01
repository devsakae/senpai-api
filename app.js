const fs = require('fs');
const stream = require('stream');
const express = require('express');
const { markAsRead } = require('./src/controllers/markAsRead.controller');
const { checkContact } = require('./src/controllers/saveContact.controller');
const { senpaiMongoDb } = require('./src/utils/connections');
const { checkAndLog } = require('./src/utils');
const { checkType } = require('./src/controllers/checkType.controller');
const { premiumCheck, callBomDia, premiumClean } = require('./src/utils/cronjobs');
const { WEBHOOK_VERIFY_TOKEN, PORT, DOWNLOAD_FOLDER, MERCADOPAGO, MERCADOPAGO_TEST } = process.env;

const app = express();
app.use(express.json());

(async () => {
  console.log('Senpai, by devsakae (2025)\nInicializando o bot, aguarde...');
  try {
    senpaiMongoDb.command({ ping: 1 }).then((response) => {
      if (!response) throw Error('❌ Conexão com MongoDB');
      console.info('✔ Conexão com MongoDB');
    });
  } catch (err) {
    return console.error(err.code);
  } finally {

    console.log('✔ Agendando premiumcheck...')
    premiumCheck();
    console.log('✔ Agendando premiumClean...');
    premiumClean(); // removeExpiredPremium();
    // console.log('✔ Agendando callBomDia...');
    // callBomDia();

    app.listen(PORT, () => {
      console.log('✔ API escutando na porta', PORT);
    });
    app.get('/', (_req, res) => res.send({ status: 'online' }));

    app.get('/coffee', (_req, res) => res.status(418).end());

    app.get('/webhook', (req, res) => {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];
      // check the mode and token sent are correct
      if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
        console.log('Webhook verified successfully with challenge', challenge);
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403).end();
      }
    });

    app.get('/instahook', (req, res) => {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];
      // check the mode and token sent are correct
      if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
        console.log('Webhook verified successfully with challenge', challenge);
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403).end();
      }
    });

    app.get(MERCADOPAGO_TEST, (req, res) => {
      console.log('MERCADOPAGO_TEST GET');
      console.log(req);
      return res.sendStatus(200).end();
    })
    
    app.post(MERCADOPAGO_TEST, (req, res) => {
      console.log('MERCADOPAGO_TEST POST');
      console.log(req);
      return res.sendStatus(200).end();
    })

    app.get('/media/:user_id/:media_id', (req, res) => {
      const r = fs.createReadStream(
        './media/' + req.params.user_id + '/' + req.params.media_id,
      );
      const ps = new stream.PassThrough();
      stream.pipeline(r, ps, (err) => {
        if (err) {
          console.error('Erro getting sticker!', err.response?.data || err);
          return res.sendStatus(500);
        }
      });
      ps.pipe(res);
    });

    app.get(DOWNLOAD_FOLDER, (req, res) => {
      if (req.query['token'] === WEBHOOK_VERIFY_TOKEN) {
        res.setHeader('Content-type', 'application/zip');
        return res.sendFile(__dirname + DOWNLOAD_FOLDER + '/file.zip');
      }
      return res.sendStatus(400);
    })

    app.get('/senpailogo', (_, res) => {
      res.setHeader('Content-type', 'image/png');
      res.sendFile(__dirname + '/data/senpai-personagem.png');
    })

    app.post('/webhook', async (req, res) => {
      // Log incoming req;
      checkAndLog(req);

      // Avoid statuses messages
      if (checkType(req)) return;

      if (req?.body?.entry[0]?.changes[0]?.value?.messages) {
        await markAsRead(req.body.entry[0]?.changes[0]?.value);
        await checkContact(req);
      }

      return res.sendStatus(200);
    });

    app.post('/instahook', async (req, res) => {
      console.log(req);
      return res.sendStatus(200); 
    })

  }
})();

module.exports = {
  senpaiMongoDb,
};
