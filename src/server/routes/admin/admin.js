const express = require('express');

const router = express.Router();

//总览
router.use('/all', require('./all/all'));

//数据申请路由
router.use('/apply', require('./apply/apply'));

//数据查看
router.use('/manage', require('./manage/manage'));

//管理员登录
router.use('/login', require('./login/login'));

module.exports = router;
