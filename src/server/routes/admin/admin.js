const express = require('express');

const router = express.Router();

//数据申请路由
router.use('/apply', require('./apply/apply'));

//数据查看
router.use('/manage', require('./manage/manage'));

module.exports = router;
