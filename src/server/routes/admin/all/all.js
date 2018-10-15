const express = require('express');

const router = express.Router();

//获取登录信息
router.use('/loginRecord', require('./loginRecord'));

//获取总览资料
router.use('/exhibit', require('./exhibit'));

module.exports = router;