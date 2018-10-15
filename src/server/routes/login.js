const express = require('express');
const mysql = require('mysql');

const common = require('../libs/common');

const router = express.Router();
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
        const user_id = data[0].id;

        db.query("UPDATE `user` SET `login_date`=now() WHERE `id`= ?", [user_id]);
        db.query("SELECT * FROM `login_record` WHERE user_id = ? AND date > DATE_FORMAT(NOW(), '%Y-%m-%d')", [user_id], (err, data) => {
          if(err){
            console.log(err);
            res.status(500).send("数据库操作失败！！！").end();
          }else{
            if(!data.length){
              db.query("INSERT INTO `login_record`(`user_id`) VALUES (?)", [user_id]);
            }
          }
        });
        res.send({'type': true, 'info': {'id': data[0].id, 'username': common.md5(data[0].username, common.MD5_SUFFIX)}}).end();
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

/*检查邮箱是否存在*/
router.post('/checkEmail', (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM user WHERE email = ?", [email], (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send("数据库操作失败").end();
    }else{
      if(data.length){
        res.send({'type': true, info: 'ok'}).end();
      }else{
        res.send({'type': false, info: 'no'}).end();
      }
    }
  });
});

/*把申请表插入到数据库*/
router.post('/apply', (req, res) => {
  const { username, nickname, email, description } = req.body;

  db.query("INSERT INTO `apply`(`username`, `nickname`, `email`, `description`) VALUES(?, ?, ?, ?)", [username, nickname, email, description], (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send('数据库操作失败').end();
    }else{
      res.send({'type': true, info: 'ok'}).end();
    }
  });
});

module.exports = router;
