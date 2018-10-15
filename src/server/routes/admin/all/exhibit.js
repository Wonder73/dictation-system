const express = require('express');
const mysql = require('mysql');

const commom = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(commom.mysqlConfig);

router.post('/', (req, res) => {
  const { id } = req.body;

  exhibit(id).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err).end();
  });
});

//获取总览数据
async function exhibit(id){
  const prevLoginInfo = await getPrevLoginInfo(id);
  const accessCount = await getAccessCount();
  const userCount = await getUserCount();
  const applyCount = await getApplyCount();

  return {'type': true, 'prevLoginDate': prevLoginInfo.date, 'prevLoginIP': prevLoginInfo.ip, accessCount, userCount, applyCount};
}

//上一次登录信息
function getPrevLoginInfo(id){
  
  return new Promise((resolve, reject) => {
    db.query('SELECT DATE_FORMAT(`date`, "%Y-%m-%d %H:%i:%s") as time, `ip` FROM `admin_login_record` WHERE `admin_id` = ? ORDER BY `date` ASC LIMIT 1,1', [id], (err, data) => {
      if(err){
        cosnole.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        if(data.length){
          resolve({'date': data[0].time, 'ip': data[0].ip});
        }else{
          resolve({'date': '未知', 'ip': '未知'});
        }
      }
    });
  });
}

//今日访问量
function getAccessCount(){
  
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM `login_record` WHERE `date` >= DATE_FORMAT(CURDATE(), "%Y-%m-%d")', (err, data) => {
      if(err){
        cosnole.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        resolve(data.length);
      }
    });
  });
}

//用户数
function getUserCount(){
  
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM `user`', (err, data) => {
      if(err){
        cosnole.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        resolve(data.length);
      }
    });
  });
}

//申请数
function getApplyCount(){
  
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM `apply`', (err, data) => {
      if(err){
        cosnole.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        resolve(data.length);
      }
    });
  });
}

module.exports = router;