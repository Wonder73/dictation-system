import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'antd';

import './write.scss';
import interfaceLibs from '../../libs/interface.js';

export default class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputCount: 1,     //单词个数
      autoInputCount: '',  //增加单词个数
      words:[],     //单词数据
    }
  }

  InputForm = () => {
    const { inputCount } = this.state;
    let html = '';
    for(let i = 0; i < inputCount; i++){
      html += `<Col span={12}><Input placeholder="输入英文" /></Col>
      <Col span={12}><Input placeholder="输入中文" /></Col>`;
    }
    return html;
  }

  /*增加和减少表单数*/
  handleInputCount = (e,type) => {
    let { inputCount, autoInputCount } = this.state;

    autoInputCount = parseInt(autoInputCount, 10);
    if(!autoInputCount){
      autoInputCount = 1;
    }
    if(type === 'add'){
      inputCount += autoInputCount;
    }else if(type === 'minus'){
      inputCount -= autoInputCount;
      if(inputCount < 1){
        inputCount = 1;
      }
    }

    this.setState({inputCount});
  }

  /*双向绑定autoInputChangel*/
  autoInputCountChangle = (e) => {
    let { autoInputCount } = this.state;

    autoInputCount = e.target.value;

    this.setState({ autoInputCount });
  }

  /*提交表单*/
  handleSubmit = () => {
    const writeForm = this.writeForm;   //表单节点
    const rows = writeForm.children;    //每一行的节点
    let { words } = this.state;     //用于存储单词

    for(let i = 0; i < rows.length; i++){
      const inputs = rows[i].querySelectorAll('input');
      const english = inputs[0].value;
      const chinese = inputs[1].value;
      if(english && chinese){
        words.push({
          english,
          chinese,
        });
      }
    }
    if(words.length){
      this.setState({words});
    }
    console.log(interfaceLibs.url, interfaceLibs.port, interfaceLibs.host);
  }

  render (){
    const { inputCount, autoInputCount } = this.state;

    return (
      <div className="write">
        <Row type="flex" justify="center" className="title" >
          <Col><h1>单词录入</h1></Col>
        </Row>
        <Row type="flex" justify="center" gutter={8}>
          <Col span={12}><p>英文</p></Col>
          <Col span={12}><p>中文</p></Col>
        </Row>
        <div className="write__form" ref={(writeForm) => this.writeForm = writeForm}>
          {
            ((inputCount)=>{
              let html = [];
              for(let i = 0; i < inputCount; i++){
                html.push(<Row type="flex" justify="center" gutter={8} key={i}>
                  <Col span={12}><Input placeholder="输入英文" /></Col>
                  <Col span={12}><Input placeholder="输入中文" /></Col>
                </Row>);
              }
              return html;
            })(inputCount)
          }
        </div>
        <div className="write__button">
          <Row type="flex" justify="end" align="center" gutter={8}>
            <Col span={5}><Input placeholder="增或减行数" size="small" value={autoInputCount} onChange={this.autoInputCountChangle}/></Col>
            <Col><Button type="primary" icon="plus" shape="circle" size="small" onClick={(e) => (this.handleInputCount(e, 'add'))} /></Col>
            <Col><Button type="primary" icon="minus" shape="circle" size="small" onClick={(e) => (this.handleInputCount(e, 'minus'))} /></Col>
            <Col><Button type="primary" icon="check" size="small" onClick={this.handleSubmit} >提交</Button></Col>
          </Row>
        </div>
      </div>/*write*/
    );
  }
}
