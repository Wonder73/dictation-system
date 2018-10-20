import React, { Component } from 'react';
import { Button } from 'antd';
import './home.scss';

export default class Index extends Component {

  render (){
    const { history } = this.props;

    return (
      <div className="home">
        <h1>Wonder - 听写系统</h1>
        <Button className="index__button index__button--write" onClick={(e) => {
          history.push('/write');
        }}>写入</Button>
        <Button type="primary" className="index__button index__button--dictation" onClick={(e) => {
          history.push('/dictation');
        }}>开始</Button>
        <Button className="index__button index__button--review" onClick={(e) => {
          history.push('review');
        }}>复习</Button>
      </div>
    );
  }
}
