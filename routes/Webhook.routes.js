const { Router } = require('express');

const Webhook = Router();

Webhook.post('/newuser', UserController.addNewUser);
Webhook.get('/users', UserController.getUsers);

module.exports = Webhook;