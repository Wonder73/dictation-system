import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import axios from 'axios';
import qs from 'qs'

import './check.scss';
import interfaceLib from '../../libs/interface';

const RowStyle = {
  'type': 'flex',
  'justify': 'center',
  'align': 'middle',
  'gutter': 10
}

export default class Check extends Component {
  constructor(props){
    super(props);
    this.state = {
      didDictationWords: [],
      values:{},
      achievement: 0,    //成绩
      errorWords:[],
      timing: 0,
      once: false,   //让componentWillReceiveProps只执行一次
      insertId: 0,    //保存插入数据库返回的id
    }
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentWillReceiveProps (newProps){

    if(newProps.location.state && !this.state.once){
      const user = JSON.parse(sessionStorage.getItem('user'));   //获取用户的信息
      const { state } = newProps.location;
      let didDictationWords = Object.assign([], JSON.parse(state.didDictationWords));
      let values = Object.assign({}, JSON.parse(state.values));
      let achievement = 0;     //成绩
      let errorWords = [];     //错误的单词

      /*循环找出错误的单词*/
      for(let i = 0; i < didDictationWords.length; i++){
        let pass = true;   //true 表示没有错误

        if(didDictationWords[i].english !== values[`word_${i}`].english){
          pass = false;
        }
        if(`${didDictationWords[i].parts}.${didDictationWords[i].chinese}` !== values[`word_${i}`].chinese){
          pass = false;
        }

        /*对就计分，错就记录*/
        if(pass){
          achievement += parseInt(100/didDictationWords.length, 10);
        }else{
          errorWords.push(didDictationWords[i]);
        }

        values[`word_${i}`].pass = pass;
      }

      //把相关内容写入数据库
      axios({
        method: 'post',
        url: interfaceLib.url + '/operation/record',
        data: qs.stringify({
          userId: user.id,
          username: user.username,
          didDictationWords: JSON.stringify(didDictationWords),
          values: JSON.stringify(values),
          errorWords: JSON.stringify(errorWords),
          achievement,
          timing: state.timing,
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then((response) => {
        const { data } = response;

        if(!data.type){
          this.props.history.push('/');
        }else{
          this.setState({insertId: data.insertId});
        }
      });

      this.setState({ didDictationWords, values, achievement, errorWords, once: true});
    }
  }

  /*完成返回到首页*/
  complete = () => {
    this.props.history.push('/');
  }
  /*惩罚跳转到惩罚页面*/
  goPunish = () => {
    const {errorWords, insertId} = this.state;

    this.props.history.push({'pathname': '/punish', state: {errorWords, insertId}});
  }

  render (){
    const { didDictationWords, values, achievement, errorWords } = this.state;

    /*判断有无内容*/
    if(didDictationWords.length && JSON.stringify(values) !== "{}"){
      return (
        <div className="check">
          <h1>成绩单</h1>
          <div className="check__content">
            <Row {...RowStyle}>
              <Col xs={10} xl={4} lg={5} md={6}>
                <Row {...RowStyle} style={{'padding': '5px 0'}}>
                  <Col style={{'fontSize': '14px', 'color': '#666'}}>听写的单词</Col>
                </Row>
                {didDictationWords.map((value, index) => {
                  return (
                    <Row {...RowStyle} style={{'borderBottom': '1px solid #ddd', 'padding': '5px 0'}} key={index}>
                      <Col style={{'fontSize': '18px'}}>{value.english}</Col>
                      <Col style={{'fontSize': '15px'}}>{value.parts}.{value.chinese}</Col>
                    </Row>
                  )
                })}
              </Col>
              <Col xs={10} xl={4} lg={5} md={6}>
                <Row {...RowStyle} style={{'padding': '5px 0'}}>
                  <Col style={{'fontSize': '14px', 'color': '#666'}}>你听写的单词</Col>
                </Row>
                {
                  (() => {
                    let html = [];

                    for(let value in values){
                      html.push(
                        <Row {...RowStyle} style={{'borderBottom': '1px solid #ddd', 'padding': '5px 0', 'color': (!values[value].pass? '#ff4d4f': 'none')}} key={value}>
                          <Col style={{'fontSize': '18px'}}>{values[value].english? values[value].english: '空'}</Col>
                          <Col style={{'fontSize': '15px'}}>{values[value].chinese? values[value].chinese: '空'}</Col>
                        </Row>
                      );
                    }

                    return html;
                  })()
                }
              </Col>
            </Row>
          </div>
          <h2 className="achievement" style={{'color': (achievement >= 60? '#52c41a': '#ff4d4f')}}>{achievement}分</h2>
          <Row {...RowStyle}>
            {
              (errorWords.length? <Col><Button type="danger" style={{'width': '100px'}} onClick={this.goPunish}>惩罚</Button></Col>: null)
            }
            <Col><Button type="primary" style={{'width': '100px'}} onClick={this.complete}>完成</Button></Col>
          </Row>
        </div>
      );
    }

    return null;
  }
}
