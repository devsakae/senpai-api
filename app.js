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

app.post('/msg', (req, res) => {
  console.log(req.body);
  return res.send({ "message": "Mensagem recebida" })
})