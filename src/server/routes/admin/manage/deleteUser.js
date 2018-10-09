const express = require('express');
const mysql = require('mysql');

const common = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

//删除用户
router.post('/', (req, res) => {
  const { id } = req.body;

  deleteUser([JSON.parse(id)]).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//删除30天未登录的用户
router.post('/deleteUnLogin', (req, res) => {
  const { id } = req.body;

  deleteUnLogin().then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//删除用户数据
async function deleteUser(id){
  await deleteUserRecord(id);
  await deleteUserWords(id);
  await deleteUserData(id);

  return { 'type': true, 'info': 'ok'};
}

//删除30天为登录的用户
async function deleteUnLogin(){
  const id = await getUnLoginUser();
  if(id.length){
    await deleteUserRecord(id);
    await deleteUserWords(id);
    await deleteUserData(id);
  }
  return { 'type': true, 'info': 'ok'};
};

//获取30天未登录的用户
function getUnLoginUser(){
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM `user` WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) >= DATE(`login_date`)', (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'})
      }else{
        if(data.length){
          const id = data.map((value, index) => value.id);
          resolve([id]);
        }else{
          resolve([])
        }
      }
    });
  });
}

//删除用户听写记录
function deleteUserRecord(id){
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM dictation_record WHERE user_id in ?`, [id], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'})
      }else{
        resolve({'type': true, 'info': 'ok'});
      }
    });
  });
}

//删除用户单词表
function deleteUserWords(id){
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM words WHERE user_id in ?`, [id], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'})
      }else{
        resolve({'type': true, 'info': 'ok'});
      }
    });
  });
}

//删除用户
function deleteUserData(id){
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM user WHERE id in ?`, [id], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'})
      }else{
        resolve({'type': true, 'info': 'ok'});
      }
    });
  });
}

module.exports = router;
