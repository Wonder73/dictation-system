import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

import './header.scss';

export default class Header extends Component{

  render (){
    const { inlineCollapsed } = this.props;

    return (
      <div className="admin__main--header" style={{'paddingLeft': (inlineCollapsed? 70: 140)}}>
        <div className="admin__main--header_left">
          <p><Icon type="home" /> <NavLink to="/">网站首页</NavLink></p>
        </div>
        <div className="admin__main--header_right">
          <p>你好, <span>Wonder</span> <span className="logout"><Icon type="export" /></span></p>
        </div>
      </div>
    );
  }
}
