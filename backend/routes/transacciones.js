const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Transacciones endpoint');
});

module.exports = router;
