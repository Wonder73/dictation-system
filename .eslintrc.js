module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
  ],
  "rules": {
    //缩进
    "indent": [
      "error",
      2,
      {
        //"SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
        "SwitchCase": 1
      }
    ],
    // 强制使用一致的换行风格
    "linebreak-style": [
      "error",
      "windows"
    ],
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": [
      "error",
      "single"
    ],
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    "semi": [
      "error",
      "always"
    ],
    // 禁用 debugger
    "no-debugger": 2,
    // 禁止出现未使用过的变量
    "no-unused-vars": 'off',
    // 禁止混合常规 var 声明和 require 调用
    "no-mixed-requires": 1,
    // 禁止调用 require 时使用 new 操作符
    "no-new-require": 2,
    // 要求使用箭头函数作为回调
    "prefer-arrow-callback": 1,
    //  禁止在嵌套的块中出现 function 或 var 声明
    "no-inner-declarations": [2, "functions"],
    // 控制逗号前后的空格
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    "computed-property-spacing": [2, "never"],
    // e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
    "consistent-this": [1, "that"],
    // 强制回调函数最大嵌套深度 5层
    "max-nested-callbacks": [1, 2],
    // 要求 return 语句之前有一空行
    "newline-before-return": 1,
    // 不允许多个空行
    "no-multiple-empty-lines": [2, { "max": 1 }],
    // 强制在一元操作符前后使用一致的空格
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": false
    }],
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 要求使用 let 或 const 而不是 var
    "no-var": 2,
    // 要求使用模板字面量而非字符串连接
    "prefer-template": 1,
  }
};