// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a la app Sistema de Conferencias!');
});

module.exports = router;