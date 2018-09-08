const express = require('express');

var router = express.Router();

router.use('/checkLogin', (req, res) => {
  console.log(req.body);
  res.send('Hello World').end();
});

module.exports = router;
