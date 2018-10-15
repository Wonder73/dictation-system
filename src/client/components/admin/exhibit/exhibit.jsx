import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { NavLink } from 'react-router-dom';

import './exhibit.scss';
import interfaceLib from '../../../libs/interface';

export default class Exhibit extends Component {
  constructor(props){
    super(props);
    this.state = {
      adminInfo: {
        username: '',
        prevLoginDate: '',
        prevLoginIP: '',
      },
      operationInfo: {
        accessCount: 0,
        userCount: 0,
        applyCount: 0,
      }
    };
  }

  componentDidMount (){
    const admin = JSON.parse(sessionStorage.getItem('admin'));
    
    axios({
      method: 'post',
      url: `${interfaceLib.url}/admin/all/exhibit`,
      data: qs.stringify({
        id: admin.id,
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;

      if(data.type){
        const adminInfo = {
          username: admin.username,
          prevLoginDate: data.prevLoginDate,
          prevLoginIP: data.prevLoginIP,
        };
        const operationInfo = {
          accessCount: data.accessCount,
          userCount: data.userCount,
          applyCount: data.applyCount,
        };

        this.setState({adminInfo, operationInfo});
      }
    }).catch((err) => {
      throw err;
    });
  }

  render (){
    const { adminInfo, operationInfo } = this.state;

    return (
      <div className="content-all__exhibit">
        <div className="content-all__exhibit--left">
          <p>登录管理员：{adminInfo.username}</p>
          <p>权限：高</p>
          <p>上次登录时间：{adminInfo.prevLoginDate}</p>
          <p>上次登录IP：{adminInfo.prevLoginIP}</p>
        </div>
        <div className="content-all__exhibit--right">
          <p>今日访问量：{ operationInfo.accessCount }</p>
          <p>用户人数：{ operationInfo.userCount } <NavLink to="/d-admin/manage">管理用户</NavLink></p>
          <p>申请人数：{ operationInfo.applyCount } <NavLink to="/d-admin/apply">管理申请</NavLink></p>
        </div>
      </div>
    );
  }
}