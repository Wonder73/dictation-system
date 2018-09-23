import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Row, Col, Modal } from 'antd';
import PubSub from 'pubsub-js';
import axios from 'axios';
import qs from 'qs';

import './record.scss';
import interfaceLib from '../../../libs/interface';
import { CheckWords } from '../../';
import { table } from './table.js';     //表格的个数

export default class Record extends Component {
  constructor (props){
    super(props);
    this.state = {
      visible: false,   //动态显示Modal对话框
      loading: false,  //延迟加载的loading
      simple: false,   // 用于响应式显示分页
      passCount: 0,  //及格数
      total: 0,    //总数
      filterTotal: 0, //筛选过后的总数
      max: 0,     //最大分数
      min: 0,    //最小分数
      avg: 0,   //平均分
      pageSize: 10,  //一页显示的条数
      dataDetail: [],  //听写时的详情
      dataSource: [],    //表格数据源
      columns: table,

      //对话框显示的内容
      words: [],
      dictation_words: {}
    }
  }

  componentDidMount (){
    //页面刚加载时获取第一次数据
    this.ajaxGetRecord(1);

    // 用于响应式显示分页
    if(+document.documentElement.offsetWidth < 350){
      this.setState({simple: true});
    }else{
      this.setState({simple: false});
    }

    //订阅消息
    PubSub.subscribe('showDetailModal', (message, value) => {
      const { dataDetail } = this.state;
      const words = JSON.parse(dataDetail[value].words);
      const dictation_words = JSON.parse(dataDetail[value].dictation_words);

      this.setState({visible: true, words, dictation_words});
    })
  }

  /*处理分页*/
  handlePage = (pagination, filters, sorter) => {
    let current = 1;
    let order = {};

    //分页
    if(pagination.current) {
      current = pagination.current;
    }
    //排序
    if(sorter.field) {
      if(sorter.field === 'sequence'){
        order.field = 'id';
      }else{
        order.field = sorter.field;
      }
      order.order = sorter.order.replace(/end$/, '');
    }

    this.ajaxGetRecord(current, JSON.stringify(order), JSON.stringify(filters));
  }

  /*通过ajax获取信息*/
  ajaxGetRecord = (current, order='{}', filters='{}') => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { pageSize } = this.state;

    this.setState({loading: true});
    axios({
      method: 'post',
      url: interfaceLib.url + '/user/record',
      data: qs.stringify({
        id: user.id,
        username: user.username,
        pageSize,      //一页条数
        current,      //页码
        order,       //排序
        filters,    //筛选
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;

      this.setState({loading: false});
      if(data.type){
        const content = data.data;

        this.setState({dataDetail: content.dataDetail, dataSource: content.dataSource, total: content.total, filterTotal: content.filterTotal, passCount: content.passCount, max: content.max, min: content.min, avg: content.avg});
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  //关闭对话框
  handleCancel = () => {
    this.setState({visible: false});
  }

  render (){
    const { columns, dataSource, simple, total, filterTotal, pageSize, passCount, max, min, avg, loading, visible, words, dictation_words} = this.state;
    const passRate = (+passCount/+total)*100;

    return (
      <div className="user__record">
        <div className="user__record--achievement">
          <Row type="flex" align="bottom" justify="center">
            <Col><p>最高分：{max}</p></Col>
            <Col><p>最低分：{min}</p></Col>
            <Col><p>平均分：{avg.toFixed(2)}</p></Col>
            <Col><p>及格数：{passCount}</p></Col>
            <Col><p>总数：{total}</p></Col>
            <Col><p>及格率：<span className={passRate>=90? 'green': passRate>=60? 'orange': 'red'}>{`${passRate.toFixed(1)}%`}</span></p></Col>
          </Row>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{total: filterTotal, pageSize: pageSize, hideOnSinglePage: true, showQuickJumper: true, simple}}
          loading = {loading}
          locale = {{filterConfirm: '确定', filterReset: '重置', emptyText: <NavLink to="/dictation">暂无数据 听写</NavLink>}}
          scroll={{ x: 700}}
          onChange={this.handlePage}
        />

        <Modal
          visible={visible}
          footer={null}
          title="单词详情"
          keyboard={true}
          onCancel={this.handleCancel}
        >
          <CheckWords didDictationWords={words} values={dictation_words} span={{span: 12}}/>
        </Modal>
        <br/>
        <br/>
      </div>
    );
  }
}
