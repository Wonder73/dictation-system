import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { Modal, Row, Col, InputNumber, Radio, Switch, Slider } from 'antd';

import './dictation-config.scss';
const marks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
}

export default class Dictation extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true,  //要不要显示Model
      config: {}
    }
  }

  static propTypes = {
    config: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    wordsCount: PropTypes.number.isRequired,
  }

  componentWillReceiveProps (newProps){
    this.setState({ config: newProps.config });   //把props过来的config保存到该组件的config中
  }

  /*修改配置文件*/
  changeConfig = (value, type) => {
    let { config } = this.state;

    switch(type){
      case 'voice':    //改变声音
        config.voice = value;
        break;
      case 'speed':    //改变语速
        config.speed = value;
        break;
      case 'wordTypes':  //改变获取单词的类型
        config.wordTypes.type = value;
        break;
      case 'range':     //获取单词的区间
        config.wordTypes.range = value;
        break;
      case 'autoPlayType':   //改变播放类型
        config.autoPlay.type = value;
        break;
      case 'autoPlayInterval':   //自动播放时的间隔
        config.autoPlay.interval = value;
        break;
      case 'dictationCount':
        config.dictationCount = value;
        break;
      default:break;
    }

    this.setState({config});
  }

  /*点击向父组件发送config信息*/
  sendConfig = () => {
    const { config } = this.state;
    if(this.props.wordsCount === 1){
      Modal.warning({
        title: '警告',
        content: '单词表必须有超过一个的单词才可以听写, 点击录入，前往录单词页面',
        maskClosable: true,
        okText: '录入',
        onOk: () => {
          this.props.history.push('/write');
        },
        onCancel:() => {
          this.props.history.goBack();
        }
      })
    }else{
      PubSub.publish('changeConfig', config);
      this.setState({visible: false});
    }
  }

  /*点击返回跳转到首页*/
  returnIndex = () => {
    this.props.history.push('/')
  }

  /*滑动输入条的数字格式*/
  formatter = (value) => {
    return `${value}s`
  }

  render (){
    const { config, visible } = this.state;

    if(!config.voice){   //判断config有没有内容，没有就直接发回
      return null;
    }
    return (
      <div className="dictation-config">
        <Modal
          wrapClassName = "dictation-config__Modal"
          title = "听写配置"
          okText = "完成"
          cancelText = "返回"
          visible = {visible}
          keyboard = {true}
          onOk = {this.sendConfig}
          onCancel = {this.returnIndex}
          centered
        >
          <Row type="flex" align="middle" gutter={4}>
            <Col span={4}>声音:</Col>
            <Col span={20}>
              <Radio.Group buttonStyle="solid" defaultValue={config.voice} onChange={(e) => (this.changeConfig(e.target.value, 'voice'))}>
                <Radio.Button value="male">男声</Radio.Button>
                <Radio.Button value="female">女声</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={4}>
            <Col span={4}>语速:</Col>
            <Col span={20}>
              <Slider defaultValue={config.speed} min={0} max={9} marks={marks} onChange={(value) => (this.changeConfig(value, 'speed'))} />
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={4}>
            <Col span={4}>听写数:</Col>
            <Col span={20}><InputNumber min={0} max={100} value={config.dictationCount} onChange={(value) => (this.changeConfig(value, 'dictationCount'))} /></Col>
          </Row>
          <Row type="flex" align="middle" gutter={4}>
            <Col span={4}>单词数:</Col>
            <Col span={20}>
              <Radio.Group style={{width: '100%'}} defaultValue={config.wordTypes.type} onChange={(e) => (this.changeConfig(e.target.value, 'wordTypes'))}>
                <Radio style={{display: 'block'}} value="1">最新10个</Radio>
                <Radio style={{display: 'block'}} value="2">最新20个</Radio>
                <Radio style={{display: 'block'}} value="3">最新30个</Radio>
                <Radio style={{display: 'block'}} value="4">
                  更多...
                  {
                    config.wordTypes.type === '4'? <Slider range defaultValue={config.wordTypes.range} max={this.props.wordsCount} onChange={(value) => (this.changeConfig(value, 'range'))} />: null
                  }
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={4}>
            <Col span={4}>自动播放:</Col>
            <Col span={20}>
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={config.autoPlay.type} onChange={(value) => (this.changeConfig(value, 'autoPlayType'))} />
            </Col>
          </Row>
          {
            config.autoPlay.type? (
              <Row type="flex" align="middle" gutter={10}>
                <Col span={15} offset={4}>
                  <Slider value={config.autoPlay.interval} max={120} tipFormatter={this.formatter} onChange={(value) => (this.changeConfig(value, 'autoPlayInterval'))} />
                </Col>
                <Col span={4}>
                  <InputNumber style={{width: '100%'}} min={0} max={120}  value={config.autoPlay.interval} onChange={(value) => (this.changeConfig(value, 'autoPlayInterval'))}  />
                </Col>
                <Col span={1}>s</Col>
              </Row>
            ): null
          }
        </Modal>
      </div>
    );
  }
}
