const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const common = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);
const mailTransport = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '3566409483@qq.com',
    pass: 'ufjqfumfkqrccgjj',
  }
});

router.post('/', (req, res) => {
  const { data } = req.body;

  allow(JSON.parse(data)).then((response) => {
    console.log(response);
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err).end();
  });
});

//允许申请
async function allow(data){
  const filter = await filterData(data);   //筛选数据
  if(filter.length){
    await insertUserData(filter);    //插入数据
  }
  await deleteApplyData(data);    //删除数据
  const info = await sendMail(filter);      //发送短信

  return info;
};

//筛选数据
function filterData(data){
  return new Promise((resolve, reject) => {
    db.query('SELECT `email` FROM user', (err, mysqlData) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        let filterData = [];
        if(mysqlData.length){
          for(let value of data){
            if(JSON.stringify(mysqlData).indexOf(`"${value.email}"`) < 0){
              value.username = common.randomStr(common.randomStr_len) + '_' + value.username;
              filterData.push(value);
            }
          }
          resolve(filterData);
        }else{
          resolve(data);
        }
      }
    });
  });
}

function insertUserData(data){
  let values = data.map((value, index) => {
    return [value.username, value.nickname, value.email];
  });

  return new Promise((resolve, reject) => {
    db.query('INSERT INTO `user`(`username`, `nickname`, `email`) values ?' , [values], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }{
        resolve({'type': true, 'info': 'insert_ok'});
      }
    });
  })
}

function deleteApplyData(data){
  const arrayId = data.map((value, index) => {
    return value.applyId;
  });

  return new Promise((resolve, reject) => {
    db.query('DELETE FROM `apply` WHERE `id` in ?', [[arrayId]], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        resolve({'type': true, 'info': 'delete_ok'});
      }
    });
  })
}

function sendMail(data){
  return new Promise((resolve, reject) => {
    for(let value of data){
      const mailOption = {
        from: '3566409483@qq.com',
        to: value.email,
        subject: '申请成功',
        text: `申请成功！欢迎您使用我们的系统，你的用户名是: ${value.username}`,
      }
      mailTransport.sendMail(mailOption, (err, info) => {
        if(err) {
          console.log(err);
          db.query('DELETE FROM user WHERE email = ?', [value.email], (err, data) => {
            if(err){
              console.log('数据库：' + err);
            }
          })
        }
      })
    }
    resolve({'type': true, 'info': 'ok'});
  });
}


module.exports = router;
