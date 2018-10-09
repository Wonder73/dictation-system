const express = require('express');
const mysql = require('mysql');
const common = require('../../../libs/common');

const db = mysql.createPool(common.mysqlConfig);
const router = express.Router();


//删除数据
router.post('/', (req, res) => {
  const {id} = req.body;
  const arrayId = JSON.parse(id);

  db.query('DELETE FROM `apply` WHERE `id` in ?', [[arrayId]], (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send({type: false, info: '数据库操作失败'}).end();
    }else{
      res.send({type: true, info: 'ok'}).end();
    }
  });
});

//删除重复的内容
router.get('/repetition', (req, res) => {
  db.query('DELETE FROM `apply` WHERE `id` NOT IN (SELECT a.id from (SELECT MAX(`id`) AS id FROM `apply` GROUP BY `email`) a)', (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send({type: false, info: '数据库操作失败'}).end();
    }else{
      res.send({type: true, info: 'ok'}).end();
    }
  })
});

module.exports = router;
