const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: 'ajsldjfaoweijrslnsjf&(&(JHT^&%&HGTR%%*GJHGK**IG大姐夫阿什顿发斯蒂芬阿什顿发',
  md5: (str, suffix) => {
    let hash = crypto.createHash('md5');

    hash.update(str+suffix);
    return hash.digest('hex');
  },

  mysqlConfig: {
    'host': 'localhost',
    'port': '3306',
    'user': 'root',
    'password': '971115577',
    'database': 'dictation_system'
  },
  randomStr_len: 4,
  randomStr: (length) => {
    const str = '0123456789';
    let randomStr = '';

    for(let i = 0; i < length; i++){
      randomStr += str[Math.floor(Math.random()*str.length)];
    }

    return randomStr;
  }
}
