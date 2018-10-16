import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Modal } from 'antd';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';

import './app.scss';
import interfaceLib from '../../libs/interface';
import { Write, Dictation, Review } from '../../containers';
import { Home, Login, Check, Punish, User, Admin, LoginAdmin } from '../../views';

const confirm = Modal.confirm;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      'go_index': false,    //判断是否显示”返回首页
      'nickname': '',       //用户的昵称
      'history':{},
    };
  }

  static propTypes = {
    words: PropTypes.array.isRequired,
    insert: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }

  componentDidMount (){
    const { history } = this.props;

    /*判断要不要显示返回首页*/
    this.changeGoIndex(history.location);

    if(history.location.pathname.indexOf('/d-admin') < 0 && history.location.pathname.indexOf('/d-login-admin') < 0){
      this.checkUserLogin();
    }

    history.listen((location) => {
      this.changeGoIndex(location);
      /*是否有用户登录如果在“/login”路由就不用判断*/
      if(location.pathname !== '/login' && history.location.pathname.indexOf('/d-admin') < 0 && history.location.pathname.indexOf('/d-login-admin') < 0){
        this.checkUserLogin();
      }
    });
  }
  
  //通过路由来判断要不要显示“返回首页”
  changeGoIndex = (location) => {
    let { go_index } = this.state;
    const pathname = location.pathname;
    if(pathname === '/' || pathname === '/login'){
      go_index = false;
    }else{
      go_index = true;
    }
    this.setState({ go_index });
  }
  
  //判断是否有用户登录
  checkUserLogin = () => {
    const { history } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));    //用户信息
    let { nickname } = this.state;
    
    if(user){
      axios({
        method: 'post',
        url: interfaceLib.url + '/login/checkLogin',
        data: qs.stringify(user),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then((response) => {
        const data = response.data;
        //获取单词列表
        this.props.select(user);
        if(data.type) {
          nickname = data.nickname;
          this.setState({ nickname });
        }else{
          sessionStorage.removeItem('user');
          history.push('/login');
        }
      });

      return;
    }
    
    history.push('/login');
  }
  
  /*退出登录方法*/
  logoutAction = () => {
    const { history } = this.props;

    confirm({
      title: '退出登录',
      content: '你确定要退出登录吗？',
      okText: '登出',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        sessionStorage.removeItem('user');
        this.setState({nickname: ''});
        
        history.push('/login');
      },
      onCancel (){}
    });
  }
  
  render (){
    const { go_index, nickname } = this.state;
    const { history } = this.props;

    return (
      <div className="app">
        {
          (!history.location.pathname.includes('d-admin')? (
            <header>
              {
                (go_index ? <NavLink to="/" activeClassName="active">返回首页</NavLink> : <p></p>)
              }
              {nickname? <p className="user-info"><span><NavLink to='/user' >{nickname}</NavLink></span><span onClick={this.logoutAction}>退出</span></p>: ''}
            </header>
          ): null)
        }
        <Switch>
          <Route path="/login" component={Login} />登录
          <Route path="/review" component={Review} />复习
          <Route path="/dictation" component={Dictation} />听写
          <Route path="/write" component={Write} />写入
          <Route path="/check" component={Check} />检查
          <Route path="/punish" component={Punish} />惩罚
          <Route path="/user" component={User} />用户页面
          <Route path="/d-admin" component={Admin} />后台管理页面
          <Route path="/d-login-admin" component={LoginAdmin} />后台管理页面
          <Route path="/" component={Home} />首页
        </Switch>
      </div>
    );
  }
}
