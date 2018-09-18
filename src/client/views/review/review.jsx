import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import axios from 'axios';
import qs from 'qs';

import './review.scss';
import interfaceLib from '../../libs/interface';

export default class Review extends Component {
  constructor (props){
    super(props);
    this.state = {
      words : [],       //数据
      order: 'desc',    //排序
    }
  }

  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  componentWillReceiveProps (newProps){
    //初始化：把props里的words搬到state里的words
    let { words } = newProps;

    words = words.reverse();
    this.setState({words})
  }

  /*点击排序*/
  changeOrder = (e) => {
    let { order, words } = this.state;

    words = words.reverse();
    if(order === 'desc'){
      order = 'asc';
    }else{
      order = 'desc';
    }
    this.setState({ order, words });

  }

  /*点击显示或隐藏中文意思*/
  showChinese = (e, parts, chinese) => {
    if(!e.target.innerHTML){
      e.target.innerHTML = parts + '.&nbsp;&nbsp;&nbsp;' + chinese;
      e.target.style.background = 'none';
    }else{
      e.target.innerHTML = '';
      e.target.style.background = '#ddd';
    }
  }

  /*点击英文阅读*/
  playWord = (e) => {
    const text = e.target.innerHTML;

    const user = JSON.parse(sessionStorage.getItem('user'));
    axios({
      method: 'post',
      url: interfaceLib.url + '/speech',
      data: qs.stringify({
        text,
        username: user.username,
        spd: 4,   //语速
        per: 0,   //声音  女声
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
      const {data} = response;
      if(data.type){
        this.audio.src = interfaceLib.url + '/audio/' + data.src + '?' + Math.random();
      }
    });
  }

  render (){
    const { words, order } = this.state;

    return (
      <div className="review">
        <p className="order" onClick={this.changeOrder}>{(order === 'desc'? '正序': '倒序')}</p>
        <Row type="flex" justify="center" gutter={8}>
          <Col span={8}><p>英文</p></Col>
          <Col span={16}><p>中文</p></Col>
        </Row>
        <div className="content">
          {
            words.map((value, index) => (
              <Row type="flex" justify="center" gutter={8} key={index}>
                <Col span={8}><p onClick={this.playWord}>{value.english}</p></Col>
                <Col span={16}><p onClick={(e) => (this.showChinese(e, value.parts, value.chinese))}></p></Col>
              </Row>
            ))
          }
        </div>
        { /*音频播放*/ }
        <audio src='' autoPlay ref={audio => this.audio=audio}></audio>
      </div>
    );
  }
}
