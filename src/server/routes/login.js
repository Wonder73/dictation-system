const express = require('express');
const mysql = require('mysql');

const common = require('../libs/common');

var router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

/*用户登录*/
router.use('/login', (req, res) => {
  const { username } = req.body;

  db.query("SELECT id, username FROM user WHERE username = ?", [username], (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send("数据库操作失败！！！").end();
    }else{
      if(data.length <= 0){
        res.send({'type': false, 'info': '没有该用户名，如果想注册请联系管理员'}).end();
      }else{
          res.send({'type': true, 'info': {'id': data[0].id,'username': common.md5(data[0].username,common.MD5_SUFFIX)}}).end();
      }
    }
  });
});

/*检测登录*/
router.use('/checkLogin', (req, res) => {
  const { id, username } = req.body;

  db.query("SELECT username, nickname FROM user WHERE id = ?", [id], (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send("数据库操作失败！！！").end();
    }else{
      if(data.length > 0 && common.md5(data[0].username, common.MD5_SUFFIX) === username){
        res.send({'type': true, 'nickname': data[0].nickname}).end();
      }else{
        res.send({'type': false, 'nickname': ''}).end();
      }
    }
  });
});

module.exports = router;
