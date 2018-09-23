import React, { Component } from 'react';
import { NavLink, Switch, Redirect, Route } from 'react-router-dom';
import { Skeleton } from 'antd';
import axios from 'axios';
import qs from 'qs';

import './user.scss';
import interfaceLib from '../../libs/interface';
import { userRecord, userWords } from '../../components';

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      nickname: '',
    }
  }

  componentDidMount () {
    const user = JSON.parse(sessionStorage.getItem('user'));

    //user为空是不准进入
    if(!user){
      return;
    }
    axios({
      method: 'post',
      url: interfaceLib.url + '/user/getUserInfo',
      data: qs.stringify({
        id: user.id,
        username: user.username,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;

      if(data.type){
        this.setState({nickname: data.info.nickname});
      }
    }).catch((err) => {
      //dconsole.log(err);
    });
  }

  render (){
    const {nickname} = this.state;

    if(nickname){
      return (
        <div className="user">
          <h1>{nickname}</h1>
          <ul className="user__nav">
            <li><NavLink to="/user/record" activeClassName="nav-active">听写记录</NavLink></li>
            <li><NavLink to="/user/words" activeClassName="nav-active">单词表</NavLink></li>
          </ul>
          <Switch>
            <Route path="/user/record" component={userRecord} />
            <Route path="/user/words" component={userWords} />
            <Redirect to="/user/record" />
          </Switch>
        </div>
      );
    }else{
      return (
        <div>
          <Skeleton rows={10} active={true} paragraph={true} />
          <Skeleton rows={10} active={true} paragraph={true} />
          <Skeleton rows={10} active={true} paragraph={true} />
          <Skeleton rows={10} active={true} paragraph={true} />
        </div>
      );
    }

  }
}
