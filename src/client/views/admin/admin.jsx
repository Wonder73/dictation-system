import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
import qs from 'qs';
import { Route, Switch, Redirect } from 'react-router-dom';

import './admin.scss';
import interfaceLib from '../../libs/interface';
import { AdminSide, AdminHeader } from '../../components';
import All from './all/all';
import Manage from './manage/manage';
import Apply from './apply/apply';

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      inlineCollapsed: true,   //折叠左侧菜单
      username: '',
    };
  }

  componentDidMount () {
    this.checkAdminLogin();

    PubSub.subscribe('updateInlineCollapsed', (message, value) => {
      this.fold();
    });
  }

  checkAdminLogin = () => {
    const admin = sessionStorage.getItem('admin');

    axios({
      method: 'post',
      url: `${interfaceLib.url}/admin/login/checkAdminLogin`,
      data: qs.stringify({
        data: admin,
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true,
    }).then((res) => {
      const { data } = res;

      if(data.type){

        // 如果storage没有数据就写入
        if(!admin){
          sessionStorage.setItem('admin', JSON.stringify(data.data));
        }

        this.setState({username: data.data.username});
      }else{
        this.props.history.push('/d-login-admin');
      }
    }).catch((err) => {
      throw err;
    });
  }

  //展开或者折叠左侧菜单
  fold = () => {
    let { inlineCollapsed } = this.state;

    inlineCollapsed = !inlineCollapsed;

    this.setState({inlineCollapsed});
  }

  render (){
    const { inlineCollapsed, username } = this.state;
    const { history } = this.props;

    return (
      <div className="admin">
        <AdminSide inlineCollapsed={inlineCollapsed} />

        <div className="admin__main" style={{paddingLeft: (inlineCollapsed? 85: 155)}}>
          <AdminHeader inlineCollapsed={inlineCollapsed} username={username} history={history} />
          <div className="admin__side--content">
            <Switch>
              <Route path="/d-admin/manage" component={Manage} />
              <Route path="/d-admin/apply" component={Apply} />
              <Route path="/d-admin/" component={All} />
              <Redirect to="/d-admin/" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
