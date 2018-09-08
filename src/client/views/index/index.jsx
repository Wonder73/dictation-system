import React, { Component } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import './index.scss';
import interfaceLib from '../../libs/interface';

export default class Index extends Component {
  componentDidMount (){
    const user_id = sessionStorage.getItem('id');    //用户id
    const username = sessionStorage.getItem('username');  //用户名
    if(user_id && username){
      axios({
        method: 'post',
        url: '/api',
        data: qs.stringify({
          user_id,
          username
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then((response) => {
        console.log(response)
      });
      return;
    }
    this.props.history.push('/login');
  }

  render (){
    return (
      <div className="index">
        <h1>Wonder-听写系统</h1>
        <Button className="index__button index__button--write"><NavLink to="/write">写入</NavLink></Button>
        <Button type="primary" className="index__button index__button--dictation"><NavLink to="/dictation">开始</NavLink></Button>
        <Button className="index__button index__button--review"><NavLink to="/review">复习</NavLink></Button>
      </div>
    );
  }
}
