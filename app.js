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
  const payload = req.body.entry[0]?.changes[0]?.value;
  
  // if (payload?.messages[0]?.type === "request_welcome") return greetFirstUser(req, res);
  
  if (payload?.messages[0]?.type === "text") {
      const { metadata, contacts } = payload;
      const message_content = payload?.messages[0]?.type === "text" ? payload?.messages[0]?.text?.body : payload?.messages[0]?.type || "unknown";    
      console.info("msg from", contacts[0]?.profile?.name, metadata?.display_phone_number, ">", message_content, "[" + payload?.messages[0]?.type + "]");
    const business_phone_number_id = metadata?.phone_number_id;
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
          message_id: payload?.messages[0]?.id
        },
      });
    } catch(err) {
      return console.error("ERROR:", err);
    } finally {
      return res.sendStatus(200);
    };
  } 
  console.info("***", req?.body?.entry[0]?.changes[0]?.value);
  return res.sendStatus(200);
  
});
