import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs'
import {Form, Input, Button, Icon, Row, Col, Modal} from 'antd';

import './dictation-start.scss';
import interfaceLib from '../../libs/interface'

class DictationStart extends Component {
  constructor(props){
    super(props);
    this.state = {
      willDictationWords:[],    //排队中的单词
      didDictationWords:[],    //排完对的单词
      end: false,   //是否结束听写
      timing: 0,   //计时，通过计时来看自己使用了多长的时间
      endTiming: false, //点击提交时结束计时
      countDown: 5,  //倒计时，准备时间我5秒
    }
  }

  static propTypes = {
    config: PropTypes.object.isRequired,
    dictationWords: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount (){
    const { config, dictationWords } = this.props;

    this.setState({willDictationWords: Object.assign([], dictationWords)});

    /*自动下一个*/
    if(config.autoPlay.type){
      this.timing();   //计时
      this.autoPlay = setInterval(() => {
        let { countDown } = this.state;
        if(!countDown){
          this.nextWord();
          if(!this.state.end){
            countDown = (config.autoPlay.interval*1)+1;
          }else{
            countDown = -1;
          }
        }
        this.setState({countDown: countDown-1});

        if(this.state.end){
          clearInterval(this.autoPlay);
        }
      }, 1000);
    }

    /*注册键盘事件，按回车键是开始或者下一个, 前提必须不是真的播放*/
    document.querySelector('.dictation-start').addEventListener('keypress', (e) => {
      //还未听写完且不是自动播放
      if(!this.state.end && !config.autoPlay.type && e.keyCode === 13){
        e.preventDefault();
        if(this.startButton.props.children === '开始'){
          this.timing();
        }
        this.nextWord();
      }
    }, false);
  }

  //按提交按钮
  hangleSubmit = (e) => {
    const { end, didDictationWords } = this.state;

    e.preventDefault();

    if(end){
      Modal.confirm({
        title: '提交听写',
        content: '你确定要提交吗？',
        okText: '提交',
        cancelText: '取消',
        keyboard: true,
        onOk : () => {
          this.setState({endTiming: true});   //提交听写时，暂停计时
          this.props.form.validateFields((err, values) => {
            if (!err) {
              setTimeout(() => {
                this.props.history.push({pathname: '/check', state: {didDictationWords: JSON.stringify(didDictationWords), values: JSON.stringify(values), timing: this.state.timing}});
              }, 300)
              clearTimeout(this.timer);   //取消第二次播放
            }
          });
        }
      });
    }else{
      Modal.error({
        title: '错误信息',
        content: '未听写完单词，无法正常提交',
        keyboard: true,
        okText: '返回'
      })
    }
  }

  /*改变输入框的值*/
  handleChange = (e, key, type) =>{
    const { getFieldValue, setFieldsValue } = this.props.form;

    let value = getFieldValue(key);
    value[type] = e.target.value;
    setFieldsValue({
      [key]: value
    });
  }

  /*按钮点击开始听写单词*/
  startDictation =(e) => {
    if(e.target.innerHTML === '<span>开 始</span>'){
      this.timing();
    }
    this.nextWord();
  }

  /*下一个单词*/
  nextWord = () => {
    let { willDictationWords, didDictationWords} = this.state;
    let end = false;  //是否结束
    const length = willDictationWords.length;   //听写单词的长度
    const { config } = this.props;

    if(length){
      const random = Math.floor(Math.random()*length);
      const user = JSON.parse(sessionStorage.getItem('user'));

      const text = willDictationWords.splice(random, 1)[0];
      didDictationWords.push(text);

      axios({
        method: 'post',
        url: interfaceLib.url + '/speech',
        data: qs.stringify({
          text: text.english,
          username: user.username,
          spd: config.speed,
          per: (config.voice === 'male'? 1: 0),
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then((response) => {
        const { data } = response;

        clearTimeout(this.timer);  //清除上一个的倒计时
        this.audio.src = interfaceLib.url + '/audio/' + data.src + '?' + Math.random();

        /*重新播放一次*/
        this.timer = setTimeout(() => {
          this.audio.play();
        }, 2500);
      });

    }

    if(length === 1){   //结束
      end = true;
    }

    this.setState({ willDictationWords, didDictationWords, end });
  }

  /*计时，听写所花的时间*/
  timing = () => {
    let timing = 0;

    this.timings = setInterval(() => {
      timing++;
      if(this.state.endTiming){
        this.setState({timing});
        clearInterval(this.timings);
      }
    }, 1);
  }

  /*根据要听写的单词数*/
  renderInput = () => {
    const { getFieldDecorator } = this.props.form;
    const { dictationCount } = this.props.config;    //听写个数
    let html = [];    //用于存放多个输入框

    for(let i = 0; i < dictationCount; i++){
      let word = `word_${i}`
      html.push(
        <Col sm={4} xs={7} key={i}>
          <Form.Item>
            <div>
              {
                getFieldDecorator(word, {initialValue: {english: '', chinese: ''}})(<div/>)
              }
              <Input type="text" placeholder="英文" onChange={(e) => {this.handleChange(e, word, 'english')}} />
              <Input type="text" placeholder="词性.中文" onChange={(e) => {this.handleChange(e, word, 'chinese')}} />
            </div>
          </Form.Item>
        </Col>
      );
    }
    return html
  }

  render (){
    const autoPlay = this.props.config.autoPlay.type;
    const { end, didDictationWords, countDown } = this.state;
    const { config } = this.props;

    return (
      <div className="dictation-start">
        <h1>听写</h1>
        {
          /*判断是不是真的播放*/
          (config.autoPlay.type?
             <p style={{'fontWeight': 'bold', 'fontSize': '30px', 'margin': '10px 0'}}>{(countDown >= 0? countDown: '结束')}</p> :
             <Icon type="sound" style={{'fontSize': '30px', 'margin': '10px 0'}} onClick={(e) => {this.audio.play()}}/>
          )
        }
        <div className="dictation-start__form">
          <Form onSubmit={this.hangleSubmit}>
            <Row type="flex" justify="center" gutter={{sm: 20, xs: 10}}>
              {this.renderInput()}
            </Row>
            <Row type="flex" justify="center" align="top" gutter={{sm: 20, xs: 10}}>
              {
                /*判断需要手动下一个吗*/
                ((!autoPlay && !end)? (
                  <Col>
                    <Button type="ghost" style={{ width: '100px', 'marginTop': '5px' }} onClick={this.startDictation} ref={(button) => this.startButton = button}>{(didDictationWords.length? "下一个": "开始")}</Button>
                  </Col>
                ): null)
              }
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100px' }}>提交</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <audio src="" ref={(audio) => (this.audio = audio)} autoPlay></audio>
      </div>
    )
  }
}

export default Form.create({})(DictationStart);
