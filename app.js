const fs = require('fs');
const stream = require('stream');
const express = require('express');
const testData = require('./data/data.json');
const { markAsRead } = require('./src/controllers/markAsRead.controller');
const { checkContact } = require('./src/controllers/saveContact.controller');
const { senpaiMongoDb } = require('./src/utils/connections');

const app = express();
app.use(express.json());
const oneDay = 24 * 60 * 60;

const { WEBHOOK_VERIFY_TOKEN, PORT } = process.env;

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
    app.get('/media/:user_id/:media_id', (req, res) => {
      const r = fs.createReadStream(
        './media/' + req.params.user_id + '/' + req.params.media_id + '.webp',
      );
      const ps = new stream.PassThrough();
      stream.pipeline(r, ps, (err) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
      });
      ps.pipe(res);
      console.log('end');
    });

    app.post('/webhook', async (req, res) => {
      // testData.incoming.push(req.body);
      // fs.writeFileSync(
      //   './data/data.json',
      //   JSON.stringify(testData, null, 4),
      //   'utf-8',
      //   (err) => err,
      // );
      if (req.body.entry[0]?.changes[0]?.value?.messages
          && (new Date(req.body.entry[0]?.changes[0]?.value?.messages[0]?.timestamp * 1000) < (new Date().getTime() - oneDay))) {
            await markAsRead(req.body.entry[0]?.changes[0]?.value);
            return console.log('reading old msg from', req.body.entry[0]?.changes[0]?.value?.contacts[0]?.profile?.name, ">", req.body.entry[0]?.changes[0]?.value?.messages[0]?.text?.body);
          }

      if (
        req.body.entry[0]?.changes[0]?.value?.messages &&
        req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'text'
      ) {
        const payload = req.body.entry[0]?.changes[0]?.value;
        const { contacts } = payload;
        console.info(
          new Date(payload?.messages[0]?.timestamp * 1000).toLocaleString(
            'pt-br',
            { timeZone: 'America/Sao_Paulo' },
          ),
          contacts[0]?.profile?.name,
          contacts[0]?.wa_id,
          '>',
          payload?.messages[0]?.type === 'text'
            ? payload?.messages[0]?.text?.body
            : payload?.messages[0]?.type || 'unknown',
          '[' + payload?.messages[0]?.type + ']',
        );
        return await checkContact(req);
      }
      if (req?.body?.entry[0]?.changes[0]?.value?.statuses) {
        const st = req?.body?.entry[0]?.changes[0]?.value?.statuses[0];
        return console.log(
          '[' + st?.status,
          '/',
          st?.pricing?.category + '] ',
          st?.id,
        );
      }
      await checkContact(req);
      return res.sendStatus(200);
    });
  }
})();

module.exports = {
  senpaiMongoDb,
};
