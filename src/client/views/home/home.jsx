import React, { Component } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

import './home.scss';

export default class Index extends Component {

  render (){
    return (
      <div className="home">
        <h1>Wonder - 听写系统</h1>
        <Button className="index__button index__button--write"><NavLink to="/write">写入</NavLink></Button>
        <Button type="primary" className="index__button index__button--dictation"><NavLink to="/dictation">开始</NavLink></Button>
        <Button className="index__button index__button--review"><NavLink to="/review">复习</NavLink></Button>
      </div>
    );
  }
}
