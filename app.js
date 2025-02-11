const fs = require('fs');
const express = require('express');
const testData = require('./data/data.json');
const { markAsRead } = require('./src/controllers/markAsRead.controller');
const { checkContact } = require('./src/controllers/saveContact.controller');
const { senpaiMongoDb } = require('./src/utils/connections');

const app = express();
app.use(express.json());

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
    app.get('/healthcheck', (req, res) => res.status(200).end());
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

    app.post('/webhook', async (req, res) => {
      testData.incoming.push(req.body);
      fs.writeFileSync(
        './data/data.json',
        JSON.stringify(testData, null, 4),
        'utf-8',
        (err) => err,
      );
      if (
        req.body.entry[0]?.changes[0]?.value?.messages &&
        req.body.entry[0]?.changes[0]?.value?.messages[0]?.type === 'text'
      ) {
        const payload = req.body.entry[0]?.changes[0]?.value;
        const { contacts } = payload;
        const msg_time = new Date(payload?.messages[0]?.timestamp * 1000);
        const message_content =
          payload?.messages[0]?.type === 'text'
            ? payload?.messages[0]?.text?.body
            : payload?.messages[0]?.type || 'unknown';
        console.info(
          msg_time.toLocaleString('pt-br', { timeZone: "America/Sao_Paulo" }),
          contacts[0]?.profile?.name,
          contacts[0]?.wa_id,
          '>',
          message_content,
          '[' + payload?.messages[0]?.type + ']',
        );
        await markAsRead(req.body.entry[0]?.changes[0]?.value);
      }
      await checkContact(req);
      return res.sendStatus(200);
    });
  }
})();

module.exports = {
  senpaiMongoDb,
};
