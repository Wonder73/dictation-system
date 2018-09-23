import React from 'react';
import { NavLink } from 'react-router-dom';
import PubSub from 'pubsub-js';

export const table = [{
  title: '序列',
  dataIndex: 'sequence',
  key: 'sequence',
  sorter: (a, b) => a.sequence - b.sequence,
  fixed: 'left',
},{
  title: '结果(对/错/总)',
  dataIndex: 'result',
  key: 'result',
  render: (result, record, index) => (<span style={{cursor: 'pointer'}} onClick={(e) => {
    PubSub.publish('showDetailModal', index);
  }}>{result}</span>)
}, {
  title: '用时(分钟)',
  dataIndex: 'timing',
  key: 'timing',
  sorter: (a, b) => a.timing - b.timing,
  render: timing => {
    const date = new Date(+timing);
    let minutes = (date.getMinutes() > 10? date.getMinutes(): '0'+date.getMinutes());
    let seconds = (date.getSeconds() > 10? date.getSeconds(): '0'+date.getSeconds());
    return `${minutes}:${seconds}`;
  },
},{
  title: '成绩',
  dataIndex: 'achievement',
  key: 'achievement',
  sorter: (a, b) => a.achievement - b.achievement,
  filters: [
    {text: '满分', value: '0'},
    {text: '大于90分', value: '1'},
    {text: '80<=成绩<90', value: '2'},
    {text: '60<=成绩<70', value: '3'},
    {text: '及格', value: '4'},
    {text: '不及格', value: '5'},
  ],
  onFilter: (value, record) => {
    let temp = false;

    switch(+value){
      case 0:
        temp = +record.achievement === 100;
        break;
      case 1:
        temp = +record.achievement >= 90;
        break;
      case 2:
        temp = +record.achievement >= 80 && +record.achievement < 90;
        break;
      case 3:
        temp = +record.achievement >= 60 && +record.achievement < 70;
        break;
      case 4:
        temp = +record.achievement > 60;
        break;
      case 5:
        temp = +record.achievement < 60;
        break;
      default:
        temp = false;
        break;
    }

    return temp;
  },
  render: achievement => achievement + '分',
},{
  title: '惩罚',
  dataIndex: 'punish',
  key: 'punish',
  sorter: (a, b) => a.punish - b.punish,
  filters: [
    { text: '已惩罚', value: '1' },
    { text: '未惩罚', value: '0' },
  ],
  filterMultiple: false,
  onFilter: (value, record) => record.punish === +value,
  render: (punish, record, index) => {
    if(+punish){
      return "已惩罚";
    }else{
      return (
        <NavLink to={{pathname: "/punish", state: {errorWords: JSON.parse(record.errorWords),insertId: record.key}}}> <span style={{color: '#ff4d4f'}}>未惩罚</span> </NavLink>
      );
    }
  }
}, {
  title: '时间',
  dataIndex: 'date',
  key: 'date',
  render: date => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() < 10? `0${date.getMonth()}`: date.getMonth();
    const day = date.getDate() < 10? `0${date.getDate()}`: date.getDate();
    const hours = date.getHours() < 10? `0${date.getHours()}`: date.getHours();
    const minutes = date.getMinutes() < 10? `0${date.getMinutes()}`: date.getMinutes();
    const seconds = date.getSeconds() < 10? `0${date.getSeconds()}`: date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
}];
