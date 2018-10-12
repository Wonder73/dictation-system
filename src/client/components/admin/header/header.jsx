import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal, Icon } from 'antd';

import './header.scss';
import interfaceLib from '../../../libs/interface';

export default class Header extends Component{

  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  logout = () => {
    Modal.warning({
      title: '退出登录',
      content: '你确定要退出登录吗',
      okText: '登出',
      maskClosable: true,
      onOk: () => {
        axios({
          method: 'post',
          url: `${interfaceLib.url}/admin/login/logout`,
          header: {'Content-Type': 'application/x-www-form-urlencoded'},
          withCredentials: true,
        }).then((response) => {
          const { data } = response;
          if(data.type) {
            sessionStorage.removeItem('admin');
            this.props.history.push('/d-login-admin');
          }
        }).catch((err) => {
          throw err;
        });
      }
    });
  }

  render (){
    const { inlineCollapsed, username } = this.props;

    return (
      <div className="admin__main--header" style={{'paddingLeft': (inlineCollapsed? 70: 140)}}>
        <div className="admin__main--header_left">
          <p><Icon type="home" /> <NavLink to="/">网站首页</NavLink></p>
        </div>
        <div className="admin__main--header_right">
          <p>你好, <span>{username}</span> <span className="logout" onClick={this.logout}><Icon type="export" /></span></p>
        </div>
      </div>
    );
  }
}
