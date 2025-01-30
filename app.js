const express = require('express');
const axios = require('axios');
const { greetFirstUser } = require('./src/templates');

const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, VERSION } = process.env;

app.listen(PORT, () => {
  console.log("API iniciou na porta", PORT);
});

app.get("/", (_req, res) => res.send({ "status": "online" }) );
app.get("/healthcheck", (req, res) => res.status(200).end());
app.get("/coffee", (_req, res) => res.status(418).end());

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("Webhook verified successfully with challenge", challenge);
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403).end();
  }
});

app.post("/webhook", async (req, res) => {
  
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const payload = req.body.entry[0]?.changes;
  const phone_number = payload[0]?.value?.metadata?.display_phone_number;
  const contact = payload[0]?.value?.contacts[0];
  const message = payload[0]?.value?.messages[0];
  const message_content = message?.type === "text" ? message?.text?.body : message?.type;
  console.info("message from", contact?.profile?.name, phone_number, ">", message_content);
  
  if (message?.type === "request_welcome") return greetFirstUser(req, res);

  // check if the incoming message contains text
  if (message?.type === "text") {
    const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    try {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/${VERSION}/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id
        },
      });
    } catch(err) {
      return console.error("ERROR:", err);
    };
  }
  return res.sendStatus(200);
});
