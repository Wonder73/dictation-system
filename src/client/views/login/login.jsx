import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Button, Input, Icon } from 'antd';

import './login.scss';
import interfaceLib from '../../libs/interface';

export default class Login extends Component {
  constructor (props){
    super(props);
    this.state = {
      username: "",    //用户名
      error_info: "",  //登录错误信息
      loading: false,  //登录状态
    }
  }

  componentDidMount (){
    const user = JSON.parse(sessionStorage.getItem('user'));    //用户信息
    if(user){
      this.props.history.push('/');
    }
  }

  /*用户名的双向绑定*/
  changeUsername = (e) => {
    let { username } = this.state;

    username = e.target.value.replace(/\s+/g,'');
    this.setState({username});
  }

  /*清空用户名*/
  emptyUsername = (e) => {
    let { username } = this.state;

    username = '';
    this.setState({username});
  }

  /*登录方法*/
  loginAction = () => {
    let { username, loading, error_info } = this.state;

    loading = true;
    this.setState({loading});

    /*是否为空*/
    if(!username){
      error_info = '用户名不可以为空';
      loading = false;
      this.setState({loading, error_info});
      return ;
    }
    /*发送ajax请求*/
    axios({
      method: 'post',
      url: interfaceLib.url + "/login/login",
      data: qs.stringify({
        username,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
      const data = response.data;
      loading = false;
      if(data.type){
        sessionStorage.setItem('user', JSON.stringify(data.info));
        this.props.history.push('/');
      }else{
        error_info = data.info;
        username = "";
        this.setState({username, loading, error_info});
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render (){
    const { username, loading, error_info } = this.state;

    const suffix = (username? <Icon type="close-circle" className="login__Input--close" onClick={this.emptyUsername} />: '');

    return (
      <div className="login">
        <h1>用户登录</h1>
        <Input
          prefix = { <Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}} /> }
          suffix = {suffix}
          placeholder = "输入你的用户名"
          value = {username}
          onChange = {this.changeUsername}
          onPressEnter = {this.loginAction}
         />
         <Button type="primary" className="login__button" loading={loading} onClick={this.loginAction}>登录</Button>
         <p className="login__error">{error_info}</p>
      </div>
    );
  }
}
