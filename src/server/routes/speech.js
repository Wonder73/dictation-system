const express = require('express');
const AipSpeechClient = require('baidu-aip-sdk').speech;
const fs = require('fs');

const router = express.Router();
const APP_ID = '11183455';
const API_KEY = '7Gjd0PR0SXAIKS2rEejkQTI8';
const SECRET_KEY = 'ced2b792ed7257c40e2fae2e7b4cff89';

const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

router.post('/', (req, res) => {

  speechMethod(req.body).then((response) => {
    res.send(response).end();
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err).end;
  });
});

async function speechMethod (body){
  const data = await getSpeechName(body);
  if(data){
    const content = await write(data, body.username);

    return content;
  }

}

function getSpeechName ({ text, spd, per }){
  
  return new Promise((resolve, reject) => {
    client.text2audio(text, {spd, per }).then((result) => {
      if(result.data){
        resolve(result.data);
      }else{
        reject(result);
      }
    });
  });
}

function write(data, username) {

  return new Promise((resolve, reject) => {
    fs.writeFile('public/audio/' + username + '.mp3', data, (err, data) => {
      if(err){
        console.log(err);
        reject('文件操作失败！！');
      }else{
        resolve({'type': true, 'src': `${username}.mp3`});
      }
    });
  });
}

module.exports = router;
