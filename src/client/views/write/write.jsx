import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import { Modal, Button, Input, Icon, Row, Col } from 'antd';

import './write.scss';
import interfaceLibs from '../../libs/interface';

export default class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputCount: 1,     //单词个数
      autoInputCount: '',  //增加单词个数
      visible: false,     //显示确定对话框
      confirmLoading: false,  //异步提交
      words:[],     //单词数据
    }
  }

  static propTypes = {
    words: PropTypes.array.isRequired,
    insert: PropTypes.func.isRequired,
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

  /*清空输入框*/
  emptyInput = (e) => {
    if(e.target.nodeName === 'path'){
      e.target.parentNode.parentNode.parentNode.previousSibling.value = '';
    }else{
      e.target.parentNode.parentNode.previousSibling.value = '';
    }
  }

  /*提交表单*/
  handleSubmit = () => {
    const writeForm = this.writeForm;   //表单节点
    const rows = writeForm.children;    //每一行的节点
    let words = [];

    for(let i = 0; i < rows.length; i++){
      const inputs = rows[i].querySelectorAll('input');
      const english = inputs[0].value;
      const parts = inputs[1].value;
      const chinese = inputs[2].value;
      if(english && chinese){
        words.push({
          english,
          parts,
          chinese,
        });
      }
    }
    if(words.length){
      this.setState({words, visible: true});
    }
  }
  /*确定提交表当*/
  hangleOk = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { words } = this.state;    //该页面的words
    const stateWords = this.props.words;    //state的words
    const newStateWords = stateWords.concat(words);   //新的
    this.setState({confirmLoading: true});
    axios({
      method: 'post',
      url: interfaceLibs.url + '/operation/insert',
      data: qs.stringify({
        userId: user.id,
        username: user.username,
        data:JSON.stringify(newStateWords),
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
      const { data } = response;
      this.setState({confirmLoading: false, visible: false});
      if(data.type){
        this.props.insert(newStateWords);
        const modal = Modal.success({
          content: '提交成功！！！',
          okType: 'none',
          onOk: () => {
            this.props.history.push('/');
          }
        });
        setTimeout(() => {
          if(this.props.history.location.pathname === '/write'){
            this.props.history.push('/');
            modal.destroy();
          }
        }, 3000);
      }else{
        const modal = Modal.error({
          content: '操作失败！！！',
          okType: 'none',
        });
        setTimeout(() => {
          modal.destroy();
        }, 3000);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  /*取消对话框*/
  hangleCancel = () => {
    this.setState({ visible: false });
  }


  render (){
    const { visible, confirmLoading, words, inputCount, autoInputCount } = this.state;

    return (
      <div className="write">
        <Row type="flex" justify="center" className="title" >
          <Col><h1>单词录入</h1></Col>
        </Row>
        <Row type="flex" justify="center" gutter={8}>
          <Col sm={10} xs={8}><p>英文</p></Col>
          <Col sm={4} xs={8}><p>词性</p></Col>
          <Col sm={10} xs={8}><p>中文</p></Col>
        </Row>
        <div className="write__form" ref={(writeForm) => this.writeForm = writeForm}>
          {
            ((inputCount)=>{
              let html = [];
              for(let i = 0; i < inputCount; i++){
                html.push(<Row type="flex" justify="center" gutter={8} key={i}>
                  <Col  xs={8} sm={10}><Input placeholder="输入英文" suffix={<Icon type="close-circle" className="write__form--close" onClick={this.emptyInput} />} /></Col>
                  <Col xs={8} sm={4}><Input placeholder="词性" suffix={<Icon type="close-circle" className="write__form--close" onClick={this.emptyInput} />} /></Col>
                  <Col xs={8} sm={10}><Input placeholder="输入中文" suffix={<Icon type="close-circle" className="write__form--close" onClick={this.emptyInput} />} /></Col>
                </Row>);
              }
              return html;
            })(inputCount)
          }
        </div>
        <div className="write__button">
          <Row type="flex" justify="end" align="center" gutter={8}>
            <Col span={5}><Input placeholder="增或减行数" size="small" value={autoInputCount} onChange={this.autoInputCountChangle} onPressEnter={(e) => (this.handleInputCount(e, 'add'))}/></Col>
            <Col><Button type="primary" icon="plus" shape="circle" size="small" onClick={(e) => (this.handleInputCount(e, 'add'))} /></Col>
            <Col><Button type="primary" icon="minus" shape="circle" size="small" onClick={(e) => (this.handleInputCount(e, 'minus'))} /></Col>
            <Col><Button type="primary" icon="check" size="small" onClick={this.handleSubmit} >提交</Button></Col>
          </Row>
        </div>
        <Modal title="单词"
          visible = {visible}
          confirmLoading = {confirmLoading}
          okText = "提交"
          cancelText ="取消"
          onOk = {this.hangleOk}
          onCancel = {this.hangleCancel}
          centered
        >
          <Row type="flex" justify="center" gutter={8}>
            <Col span={10}><p>英文</p></Col>
            <Col span={4}><p>词性</p></Col>
            <Col span={10}><p>中文</p></Col>
          </Row>
          {
            words.map((value, index) => {
              return (
                <Row type="flex" justify="center" gutter={8} key={index}>
                  <Col span={10}><p>{value.english}</p></Col>
                  <Col span={4}><p>{value.parts}</p></Col>
                  <Col span={10}><p>{value.chinese}</p></Col>
                </Row>
              )
            })
          }
        </Modal>
      </div>/*write*/
    );
  }
}
