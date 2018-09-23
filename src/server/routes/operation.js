const express = require('express');
const mysql = require('mysql');

const common = require('../libs/common');

const router = express.Router();
const db = mysql.createPool(common.mysqlConfig);

//插入单词表
router.post('/insert', (req, res) => {
  const {userId, username, data} = req.body;
  insert(userId, username, data).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  })
});

//查询单词表
router.post('/select', (req, res) => {
  const {userId, username} = req.body;
  select(userId, username).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  })
});

//记录听写内容
router.post('/record', (req, res) => {
  const {userId, username, didDictationWords, values, errorWords, achievement, timing } = req.body;
  const punish = (JSON.parse(errorWords).length>0?0:1);   //判断是否需要惩罚

  record(userId, username, [ userId, didDictationWords, values, errorWords, +timing, +achievement, punish ]).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err.info).end();
  })
});

/*完成惩罚*/
router.post('/completePunish', (req, res) => {
  const { insertId } = req.body;

  db.query('UPDATE dictation_record SET punish = 1 WHERE id = ?', [insertId], (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send('数据库操作失败').end();
    }else{
      res.send({'type': true, 'info': ''}).end();
    }
  });
});

async function insert (id, username, words){
  await checkUser(id, username);
  const type = await checkWordsId(id);
  let data, sql;
  if(type === 'insert'){
    sql = 'INSERT INTO words(words, user_id) VALUES(?, ?)';
  }else if(type === 'update'){
    sql = 'UPDATE words SET words = ? where user_id = ?';
  }
  data = await insertWords(sql , [words, id]);
  return data;
}

async function select (id, username){
  await checkUser(id, username);
  const data = await selectWords(id);
  return data;
}

async function record (id, username, array){
 await checkUser(id, username);
 const data = await insertRecord(array);
 return data;
}


/*检查用户是否存在*/
function checkUser(id, username){
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, data) => {
      if(err){
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        if(data.length && common.md5(data[0].username, common.MD5_SUFFIX) === username){
          resolve({'type': true, 'info': ''});
        }else{
          reject({'type': false, 'info': '找不到该用户'});
        }
      }
    });
  });
}

/*判断该用户有没有单词表，有就更新，没有就创建*/
function checkWordsId(id){
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM words WHERE user_id=?", [id], (err, data) => {
      if(err){
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        if(data.length){
          resolve('update');
        }else{
          resolve('insert');
        }
      }
    });
  });
}

/*插入或更新单词表*/
function insertWords(sql, data){
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, data) => {
      if(err){
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        resolve({'type': true, 'info': ''});
      }
    });
  });
}

/*通过用户获取单词表*/
function selectWords(id){
  return new Promise((resolve, reject) => {
    db.query('SELECT words FROM `words` WHERE id = ?', [id], (err, data) => {
      if(err){
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        if(data.length){
          resolve({'type': true, 'content': data[0].words});
        }else{
          reject({'type': false, 'content': '找不到用户数据'});
        }
      }
    });
  });
}

// 往记录表中插入记录
function insertRecord(array){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO dictation_record(`user_id`, `did_dictation_words`, `values`, `error_words`, `timing`, `achievement`, `punish`) VALUES (?, ?, ?, ?, ?, ?, ?)', array, (err, data) => {
      if(err){
        console.log(err);
        reject({'type': false, 'info': '数据库操作失败'});
      }else{
        resolve({'type': true, 'insertId': data.insertId});
      }
    });
  })
}

module.exports = router;
