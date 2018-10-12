const express = require('express');
const mysql = require('mysql');

const common = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

//登录
router.post('/', (req, res) => {

  loginAdmin(req).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    res.status(500).send(err).end();
  });
});

//检查登录
router.post('/checkAdminLogin', (req, res) => {
  
  checkAdminLogin(req).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    res.status(500).send(err).end();
  });
});

//退出登录
router.post('/logout', (req, res) => {
  delete req.session.user;
  
  res.send({'type': true, 'info': 'ok'}).end();
});

//管理员登录
async function loginAdmin(req){
  const { username, password, remember } = req.body;

  const content = await checkAdmin(username, password);
  if(content.data.id && remember === 'true'){
    req.session.user = content.data;
  }

  return content;
}

//检查用户是否用登录
async function checkAdminLogin(req){
  let { data } = req.body;
  let username, password, content;

  //在storage或session中是否有数据
  if(data){
    const dataParser = JSON.parse(data);

    username = dataParser.username;
    password = dataParser.password;
  }else if(req.session.user){
    username = req.session.user.username;
    password = req.session.user.password;
  }

  //是否可以获取到数据
  if(username && password){
    content = await checkAdmin(username, password);
  }else{
    content = {'type': false, 'info': 'error'};
  }
  
  return content;
}

//检查管理员是否正确
function checkAdmin(username, password){
  
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM admin WHERE username = ? LIMIT 1', [username], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！！'});
      }else{
        if(data.length && data[0].password === common.md5(password, data[0].salt)){
          resolve({'type': true, data: {id: data[0].id, username, password}});
        }else{
          resolve({'type': false, 'info': '登录失败！用户名或密码错误'});
        }
      }
    });
  });
}

module.exports = router;
