import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import './side.scss';
import createHistory from 'history/createHashHistory';

const history = createHistory();

export default class Side extends Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultSelectedKeys: ['all'],    //侧边栏的默认值
    };
  }

  fold = () => {
    PubSub.publish('updateInlineCollapsed', true);
  }

  componentDidMount (){
    this.updateSide();
    this.listen();
  }
  
  updateSide = () => {
    const {pathname} = history.location;
    let { defaultSelectedKeys } = this.state;

    //更新侧边栏的默认值
    if(pathname.match(/\/d-admin\/(.*)/)){
      defaultSelectedKeys = [pathname.match(/\/d-admin\/(.*)/)[1]];
    }else{
      defaultSelectedKeys = ['all'];
    }
    this.setState({defaultSelectedKeys});
  }

  listen = () => {
    history.listen((localtion) => {
      let defaultSelectedKeys = [];
      if(localtion.pathname.match(/\/d-admin\/(.*)/)){
        defaultSelectedKeys = [localtion.pathname.match(/\/d-admin\/(.*)/)[1]];
      }else{
        defaultSelectedKeys = ['all'];
      }
      this.setState({defaultSelectedKeys});
    });
  }

  render (){
    const { defaultSelectedKeys } = this.state;
    const { inlineCollapsed } = this.props;
    
    return (
      <div className="admin__side">
        <div className="admin__side--logo"><span>W</span></div>
        <div className="admin__side--menu" style={{width: (inlineCollapsed? 70: 140)}}>
          <Menu
            selectedKeys={defaultSelectedKeys}
            mode="inline"
            theme="light"
            inlineCollapsed={inlineCollapsed}
          >
            <Menu.Item key="all">
              <NavLink to="/d-admin">
                <Icon type="appstore" />
                <span>总览</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="manage">
              <NavLink to="/d-admin/manage">
                <Icon type="user" />
                <span>用户管理</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="apply">
              <NavLink to="/d-admin/apply">
                <Icon type="usergroup-add" />
                <span>用户申请</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
        <div className="admin__side--fold">
          <Icon type={(inlineCollapsed? "menu-unfold": "menu-fold")} onClick={this.fold} />
        </div>
      </div>
    );
  }
}
