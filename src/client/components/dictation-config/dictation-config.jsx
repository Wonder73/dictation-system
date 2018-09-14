import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, InputNumber, Radio, Switch, Slider } from 'antd';

import './dictation-config.scss';
const marks = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
}

export default class Dictation extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: PropTypes.object.isRequired,
    }
  }

  static propTypes = {
  }

  returnIndex = () => {
    this.props.history.push('/')
  }

  formatter = (value) => {
    return `${value}s`
  }

  render (){

    return (
      <div className="dictation-config">
        <Modal
          title = "听写配置"
          okText = "完成"
          cancelText = "返回"
          visible = {true}
          keyboard = {true}
          onCancel = {this.returnIndex}
          centered
        >
          <Row type="flex" align="middle">
            <Col span={4}>声音：</Col>
            <Col span={20}>
              <Radio.Group defaultValue={'female'} buttonStyle="solid">
                <Radio.Button value="male">男声</Radio.Button>
                <Radio.Button value="female">女声</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={4}>语速</Col>
            <Col span={20}>
              <Slider defaultValue={4} min={1} max={10} marks={marks} />
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={4}>单词数：</Col>
            <Col span={20}>
              <Radio.Group style={{width: '100%'}} defaultValue={'1'}>
                <Radio style={{display: 'block'}} value="1">最新10个</Radio>
                <Radio style={{display: 'block'}} value="2">最新20个</Radio>
                <Radio style={{display: 'block'}} value="3">最新30个</Radio>
                <Radio style={{display: 'block'}} value="4">
                  更多...
                  <Slider range defaultValue={[0, 20]} max={41} />
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={4}>自动播放：</Col>
            <Col span={20}>
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false}/>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={10}>
            <Col span={15} offset={4}>
              <Slider defaultValue={30} max={120} tipFormatter={this.formatter}  />
            </Col>
            <Col span={4}>
              <InputNumber style={{width: '100%'}} min={0} max={120}  defaultValue={0}/>
            </Col>
            <Col span={1}>s</Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
