const express = require('express');
const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

app.listen(PORT, () => {
  console.log("API iniciou na porta", PORT);
});

app.get("/", (_req, res) => res.send({ "data": "" }) );
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
  console.info("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Obrigado por sua mensagem." },
        context: {
          message_id: message.id,
        },
        status: "read",
        message_id: message.id
      },
    });

    // mark incoming message as read
    // await axios({
    //   method: "POST",
    //   url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
    //   headers: {
    //     Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    //   },
    //   data: {
    //     messaging_product: "whatsapp",
    //     status: "read",
    //     message_id: message.id,
    //   },
    // });
  }

  return res.sendStatus(200);
});