const express = require('express');
const mysql = require('mysql');
const common = require('../../../libs/common');

const db = mysql.createPool(common.mysqlConfig);
const router = express.Router();

router.post('/', (req, res) => {
  apply(req.body).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//删除数据
router.use('/delete', require('./delete'));

//允许申请
router.use('/allow', require('./allow'));

//申请操作
async function apply(obj) {
  const { filter } = obj;
  let where;
  switch(+filter){
    case 1:
      where = 'WHERE `email` IN (SELECT `email` FROM `apply` GROUP BY `email` HAVING COUNT(`email`) = 1)';    //没有重复的申请
      break;
    case 2:
      where = 'WHERE `email` IN (SELECT `email` FROM `apply` GROUP BY `email` HAVING COUNT(`email`) > 1)';   //重复的申请
      break;
    case 3:
      where = 'WHERE `email` IN (SELECT `email` FROM `apply` GROUP BY `email` HAVING COUNT(`email`) = 1) OR `id` IN (SELECT MAX(`id`) FROM `apply` GROUP BY `email` HAVING COUNT(`email`) > 1)';     //去掉重复后的申请
      break;
    case 4:
      where = 'WHERE `email` IN (SELECT `email` FROM `apply` GROUP BY `email` HAVING COUNT(`email`) > 1) AND `id` NOT IN (SELECT MAX(`id`) FROM `apply` GROUP BY `email` HAVING COUNT(`email`) > 1)';     //去掉的重复
      break;
    default:
      break;
  }
  const total = await getTotal(where);
  const data = await getApply({where, ...obj});

  return {'type': true, 'data': {total, data}};
}

//获取申请总数
function getTotal(where){
  return new Promise((resolve, reject) => {
    db.query(`select * from apply ${where}`, (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！！！'});
      }else{
        resolve(data.length);
      }
    });
  });
}

//获取申请数据
function getApply(obj){
  const {current, pageSize, order, filter, where} = obj;
  const limit = `LIMIT ${(current-1)*pageSize}, ${pageSize}`;     //limit子句
  let sqlOrder = `ORDER BY id ${order}`;    //order子句
  if(+filter){
    sqlOrder = `ORDER BY email, id ${order}`;
  }

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM apply ${where} ${sqlOrder} ${limit}`, (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！！！'});
      }else{
        if(data.length){
          const content = data.map((value, index) => {
            return {
              'key': index,
              'id': value.id,
              'username': value.username,
              'nickname': value.nickname,
              'email': value.email,
              'description': value.description,
            }
          });
          resolve(content);
        }else{
          resolve([]);
        }
      }
    });
  });
}

module.exports = router;
