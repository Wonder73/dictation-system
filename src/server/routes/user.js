const express = require('express');
const mysql = require('mysql');

const common = require('../libs/common');

const db = mysql.createPool(common.mysqlConfig);
const router = express.Router();

router.post('/getUserInfo', (req, res) => {
  const { id, username } = req.body;

  getUserinfo(id, username).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });

});

//记录
router.post('/record', (req, res) => {

  record(req.body).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//单词
router.post('/getWords', (req, res) => {
  const { id, username } = req.body;

  getWords(id, username).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  });
});

//修改单词表
router.post('/modifyWords', (req, res) => {
  const {id, username, words} = req.body;

  modifyWords(id, username, words).catch((err) => {
    res.status(500).send(err.info).end();
  });
})

//获取用户信息
async function getUserinfo(id, username) {
  const data = await checkUser(id, username);

  return data;
}

//获取记录信息
async function record(body) {
  let filters = 'user_id = ?';    //筛选

  //筛选
  if(body.filters !== '{}'){
    const filtersObj = JSON.parse(body.filters);

    //成绩
    if(filtersObj.achievement && filtersObj.achievement.length){
      let achievement = '';   //存储成绩的筛选
      filtersObj.achievement.forEach((value, index) => {
        switch(+value){
          case 0:
            achievement += ' and achievement = 100';
            break;
          case 1:
            achievement += ' and achievement >= 90';
            break;
          case 2:
            achievement += ' and achievement >= 80 and achievement < 90';
            break;
          case 3:
            achievement += ' and achievement >= 60 and achievement < 70';
            break;
          case 4:
            achievement += ' and achievement > 60';
            break;
          case 5:
            achievement += ' and achievement < 60';
            break;
          default:
            break;
        }
      });
      filters += `${achievement}`;
    }
    //惩罚
    if(filtersObj.punish && filtersObj.punish.length){
      filters += ` and punish = ${filtersObj.punish[0]}`;
    }
  }

  await checkUser(body.id, body.username);
  const total = await getTotal(body.id, filters);      //总数,最大分数,最小分数
  const passCount = await getPassCount(body.id);   //及格数
  const data = await getRecord({...body, total, passCount, filters});

  return data;
}

//获取单词表
async function getWords(id, username) {
  await checkUser(id, username);
  const data = getUserWords(id);

  return data;
}

//修改单词表
async function modifyWords(id, username, words) {
  await checkUser(id, username);
  const data = updateWords(id, words);

  return data;
}

//检查用户是否存在
function checkUser(id, username) {
  return new Promise((resolve, reject) => {

    db.query('SELECT * FROM user WHERE id = ?', [id], (err, data) => {
      if(err){
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        if(data.length && common.md5(data[0].username, common.MD5_SUFFIX) === username){
          resolve({'type': true, 'info': {nickname: data[0].nickname}});
        }else{
          reject({'type': false, 'info': '找不到该用户'});
        }
      }
    });
  });
}

//去数据库那记录信息
function getRecord(body){
  const page = (body.current-1)*body.pageSize;     //分页，每一页的开头
  let dataSource = [];     //表格的数据源
  let dataDetail = [];    //存储听写的当初和错误的单词
  let order = '';       //排序

  //排序
  if(body.order === '{}'){
    order = 'ORDER BY id ASC';
  }else{
    const orderObj = JSON.parse(body.order);
    order = `ORDER BY ${orderObj.field} ${(orderObj.order).toUpperCase()}`;
  }

  return new Promise((resolve, reject) => {
    const field = 'd_r.id, d_r.did_dictation_words, d_r.error_words, d_r.values, d_r.timing, d_r.achievement, d_r.punish, d_r.date, (SELECT COUNT(*) FROM dictation_record WHERE id <= d_r.id ORDER BY id) as rank';
    db.query(`SELECT ${field} FROM dictation_record d_r WHERE ${body.filters} ${order} Limit ?, ?`, [body.id, page, +body.pageSize], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        data.forEach((value, index) => {
          dataSource.push({
            key: value.id,
            sequence: value.rank,
            result: `${JSON.parse(value.did_dictation_words).length - JSON.parse(value.error_words).length}/${JSON.parse(value.error_words).length}/${JSON.parse(value.did_dictation_words).length}`,
            timing: value.timing,
            achievement: value.achievement,
            punish: value.punish,
            date: value.date,
            errorWords: value.error_words,
          });
          dataDetail.push({
            words: value.did_dictation_words,
            dictation_words: value.values,
          });
        });
        resolve({'type': true, 'data': {dataSource, dataDetail, total: body.total.total, max: body.total.max, min: body.total.min, avg: body.total.avg, filterTotal: body.total.filterTotal, passCount: body.passCount}});
      }
    })
  });
}

//获取该用户的记录总数
function getTotal(id, filters) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT count(*) as total, max(achievement) as max, min(achievement) as min, avg(achievement) as avg, (select count(*) from dictation_record where ${filters}) as filterTotal FROM dictation_record WHERE user_id = ?`, [id,id], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        resolve({total: data[0].total, max: data[0].max, min: data[0].min, avg: data[0].avg, filterTotal: data[0].filterTotal});
      }
    })
  });
}
//获取该用户及格的记录总数
function getPassCount(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM dictation_record WHERE user_id = ? and achievement >= ?', [id, 60], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        resolve(data.length);
      }
    })
  });
}

//去数据库获取单词表
function getUserWords(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT `words` FROM words WHERE user_id = ? ', [id], (err, data) => {
      if(err) {
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        if(data.length){
          resolve({'type': true, 'content': data[0].words});
        }else{
          resolve({'type': false, 'content': []});
        }
      }
    });
  })
}

//更新数据库中的单词表
function updateWords(id, words) {
  return new Promise((resolve, reject) => {
    db.query('UPDATE words SET words = ? WHERE user_id=?', [words, id], (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败:'+err});
      }
    });
  });
}


module.exports = router;
