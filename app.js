const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("API starting at port", port);
});

app.get('/status', (_, res) => { 
  return res.send({ "status": "Funcional" });
})

app.get('/teste', (req, res) => {
  console.log(req.query)
  console.log(req.query["hub.mode"])
  console.log(req.query["hub.verify_token"])
  return res.send({ 'message': 'test successfull' })
})

app.get('/webhook', (req, res) => {
  const queries = req.query;
  if (queries["hub.verify_token"] !== process.env.VERIFY_TOKEN) return res.status(401).send({ "error": "token mismatch" });
  if (queries["hub.mode"] === "subscribe") {
    return res.send(queries["hub.challenge"]);
  }
  return res.send({ "message": "no data?" });
});