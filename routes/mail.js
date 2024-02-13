// routers/mail.js
const express = require('express');
const router = express.Router();

let send = require('../controllers/mailRest');

router.post('/send', send.sendMail);

module.exports = router;


