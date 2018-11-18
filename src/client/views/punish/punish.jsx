import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Row, Col, Input, Button } from 'antd';

import './punish.scss';
import interfaceLib from '../../libs/interface';

export default class Punish extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorWords: [],   //写错过的单词
      insertId: 0,    //受罚的id
    }
  }

  componentWillReceiveProps (newProps){

    if(newProps.location.state){
      const { errorWords, insertId } = newProps.location.state;

      this.setState({ errorWords, insertId });
    }
  }

  /*点击完成惩罚*/
  complete = () => {
    const { insertId } = this.state;

    axios({
      method: 'post',
      url: interfaceLib.url + '/operation/completePunish',
      data: qs.stringify({
        insertId,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;
      if(data.type){
        this.props.history.push('/');
      }
    });
  }

  render (){
    const { errorWords } = this.state;

    //判断有没有错误的单词
    if(errorWords.length){

      return (
      <div className="punish">
        <h1>错误单词</h1>
        <div className="punish__content">
          {
            errorWords.map((errorWord, index) => {
              return (
                <Row type="flex" align="middle" justify="center" gutter={10} key={index}>
                  <Col sm={2} xs={6}>
                    <p>{errorWord.english}</p>
                    <p>{`${errorWord.parts}.${errorWord.chinese}`}</p>
                  </Col>
                  {
                    /*循环出5个相同的表单*/
                    ((n)=>{
                      let html = [];

                      for(let i = 0; i < n; i++){
                        html.push(
                          <Col sm={4} xs={6} key={i}>
                            <Input type="text" placeholder="英文" />
                            <Input type="text" placeholder="词性.中文" />
                          </Col>
                        );
                      }
                      return html;
                    })(5)
                  }
                </Row>
              )
            })
          }

          <Row>
            <Col>
              <Button type="primary" style={{'display': 'block', 'width': '150px', 'margin': '20px auto'}} onClick={this.complete}>完成</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
    }

    return null;
  }
}
