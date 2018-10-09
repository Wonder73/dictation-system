const express = require('express');
const mysql = require('mysql');

const common = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

router.post('/', (req, res) => {

  updateUser(req.body).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err).end();
  });
});

//修改用户数据
async function updateUser({ username, nickname, id, check}) {
  let checkUsername = true;

  if(check === 'true'){
    checkUsername = await checkUsernameExists(username);
  }

  if(checkUsername){
    return await updateUserDate({username, nickname, id});
  }else{
    return {'type': false, 'info': '该用户名已存在'};
  }
}

//检查用户名是否存在
function checkUsernameExists(username) {

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, data) => {
      if(err) {
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        if(data.length){
          resolve(false);
        }else{
          resolve(true);
        }
      }
    });
  });
}

//往数据库中修改数据
function updateUserDate({username, nickname, id}) {

  return new Promise((resolve, reject) => {
    db.query(`UPDATE user SET username = ?, nickname = ? WHERE id = ? `, [username, nickname, id], (err, data) => {
      if(err) {
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        resolve({'type': true, 'info': 'ok'});
      }
    });
  });
}

module.exports = router;
