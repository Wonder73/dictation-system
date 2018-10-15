const express = require('express');
const mysql = require('mysql');

const commom = require('../../../libs/common');

const router = express.Router();
const db = mysql.createPool(commom.mysqlConfig);

router.post('/', (req, res) => {
  const dateRange = JSON.parse(req.body.dateRange);

  loginRecord(dateRange).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    res.status(500).send(err).end;
  });
});

async function loginRecord(dateRange) {
  const data = await getLoginRecord(dateRange);

  return data;
}

function getLoginRecord(dateRange){
  let having = '';   //条件语句
  let modifyData = {};    //用户存放修改过的数据

  if(dateRange.length){
    having = `HAVING time >= '${dateRange[0]}' AND time <= '${dateRange[1]}'`;
  }else{
    having = 'HAVING time > DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
  }
  
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as count, DATE_FORMAT(date, "%Y-%m-%d") as time FROM login_record GROUP BY time ${having} ORDER BY time`, (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败！'});
      }else{
        if(data.length){
          for(let value of data){
            modifyData[value.time] = value.count;
          }
          resolve({'type': true, data: modifyData});
        }else{
          resolve({'type': false, 'info': '没有数据'});
        }
      }
    });
  });
}

module.exports = router;