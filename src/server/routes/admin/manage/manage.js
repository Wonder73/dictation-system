const express = require('express');
const mysql = require('mysql');

const common = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

router.post('/', (req, res) => {

  getUserData(req.body).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//更新用户
router.use('/updateUser', require('./updateUser'));

//删除用户
router.use('/deleteUser', require('./deleteUser'));

async function getUserData(body) {
  const { filter } = body;
  let where = '';

  switch(+filter) {
    case 1:
      where = "WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) >= DATE(`login_date`)";
      break;
    case 2:
      where = "WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) < DATE(`login_date`)";
      break;
    default:
      break;
  }
  
  const total = await getTotal(where);
  const dataSources = await getDataSources({where, ...body});

  return {'type': true, dataSources, total};
}

//获取用户总数
function getTotal(where){
  return new Promise((resolve, reject) => {
    db.query(`select * from user ${where}`, (err, data) => {
      if(err) {
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！！'});
      }else{
        resolve(data.length);
      }
    });
  });
}

//获取用户数据
function getDataSources ({current, pageSize, order, orderType, where}){
  const content = 'user.id, username, nickname, email, (select words from words where user_id=user.id) as words, login_date, user.date, count(*) as total, max(achievement) as max, min(achievement) as min, avg(achievement) as avg, (select count(*) from dictation_record where achievement>=60 and user_id=user.id) as pass, (select count(*) from dictation_record where user_id=user.id and punish=0) as punish';
  const orderBy = `order by ${orderType} ${order}`;
  const limit = `limit ${(current - 1) * pageSize}, ${pageSize}`;

  return new Promise((resolve, reject) => {
    db.query(`select ${content} from user left join dictation_record on user.id = dictation_record.user_id ${where} group by id ${orderBy} ${limit}`, (err, data) => {
      if(err) {
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！！'});
      }else {
        if(data.length){
          const dataSources = data.map((value, index) => {
            return {
              'key': index,
              'id': value.id,
              'username': value.username,
              'nickname': value.nickname,
              'words': JSON.parse(value.words)? JSON.parse(value.words).length: 0,
              'email': value.email,
              'loginDate': value.login_date,
              'createDate': value.date,
              'edit': false,
              'achievement': {
                'max': value.max? value.max: 0,
                'min': value.min? value.min: 0,
                'avg': value.avg? value.avg: 0,
                'pass': value.pass? value.pass: 0,
                'total': value.total? value.total: 0,
                'unpunish': value.punish,
              }
            }
          });
          resolve(dataSources);
        }else{
          resolve([]);
        }
      }
    });
  });
}

module.exports = router;
