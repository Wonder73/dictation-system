import React from 'react';
import PubSub from 'pubsub-js';
import { Input, Button } from 'antd';

export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    fixed: 'left',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: (username, record) => {
      if(record.edit){
        return (<Input type="text" style={{width: 150}} defaultValue={username} />)
      }else{
        return username;
      }
    },
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    render: (nickname, record) => {
      if(record.edit){
        return (<Input type="text" style={{width: 100}} defaultValue={nickname} />)
      }else{
        return nickname
      }
    },
    width: 120,
  },
  {
    title: '单词',
    dataIndex: 'words',
    key: 'words',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '登录时间',
    dataIndex: 'loginDate',
    key: 'loginDate',
    sorter: (a, b) => +(new Date(a.loginDate).getTime()) - +(new Date(b.loginDate).getTime()),
    filters: [
      {text: '30天未登录的用户', value: '1'},
      {text: '30天内登录的用户', value: '2'},
    ],
    filterMultiple: false,
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
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
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
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (value, record, index) => {
      if(record.edit){
        return (
          <div className="manage__operation--button">
            <Button type="primary" size="small" onClick={
              (e) => {
                const inputs = e.target.parentNode.parentNode.parentNode.querySelectorAll('input[type=text]');   //表格中的input表单
                const inputUsername = inputs[0].value;    //获取表单的用户名
                const inputNickname = inputs[1].value;    //获取表单的昵称
                
                PubSub.publish('saveModify', {username: inputUsername, nickname: inputNickname, index});
              }
            }>保存</Button>
            <Button type="danger" size="small" onClick={
              (e) => {
                PubSub.publish('modifyEdit', {index, boolean: false});
              }
            }>取消</Button>
          </div>
        )
      }else{
        return (
          <div className="manage__operation--button">
            <Button type="primary" size="small" onClick={
              (e) => {
                PubSub.publish('modifyEdit', {index, boolean: true});
              }
            }>修改</Button>
            <Button type="danger" size="small" onClick={
              (e) => {
                PubSub.publish('deleteDate', index);
              }
            }>删除</Button>
          </div>
        )
      }
    }
  }
]
