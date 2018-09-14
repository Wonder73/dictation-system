const express = require('express');
const AipSpeechClient = require('baidu-aip-sdk').speech;
const fs = require('fs');

const router = express.Router();
const APP_ID = '11183455';
const API_KEY = '7Gjd0PR0SXAIKS2rEejkQTI8';
const SECRET_KEY = 'ced2b792ed7257c40e2fae2e7b4cff89';

const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

router.post('/', function (req, res){
  const { text,username } = req.body;
  client.text2audio(text, {'spd': 4}).then((result) => {
    if(result.data){
      fs.writeFile('public/audio/' + username + '.mp3', result.data, (err, data) => {
        if(err){
          console.log(err);
          res.status(500).send('文件操作失败！！').end;
        }else{
          res.send({'type': true, 'src': username + '.mp3'}).end();
        }
      });
    }else{
      console.log(result);
    }
  }, (e) => {
    console.log(e);
  });
});

module.exports = router;
