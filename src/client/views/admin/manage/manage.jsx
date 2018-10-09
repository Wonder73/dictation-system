import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
import qs from 'qs';
import { Table, Modal, Button } from 'antd';

import './manage.scss';
import interfaceLibs from '../../../libs/interface';
import columns from './table.js';

export default class All extends Component {
  constructor (props){
    super(props);
    this.state = {
      filter: 0,       //筛选
      order: 'asc',    //默认排序类型
      orderType: 'id', //默认排序字段
      total: 0,      //总条数
      pageSize: 10,  //一页显示的条数
      current: 1,  //当前页码
      loading: false, //等待加载数据
      inlineCollapsed: true,    //左侧菜单栏的变化
      simple: false,   //响应式分页
      dataSources: [],     //表格数据源
      selected: [],      //选择的数据
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          const selected = selectedRows.map((value, index) => value.id);
          this.setState({selected});
        }
      }
    }
  }

  componentDidMount (){

    //获取用户数据
    this.getUserData();

    //订阅一些消息,订阅修改左侧菜单的展开或者褶皱
    PubSub.subscribe('updateInlineCollapsed', () => {
      let { inlineCollapsed } = this.state;

      inlineCollapsed = !inlineCollapsed;
      this.setState({inlineCollapsed});
    });
    //订阅,让表格数据可以修改或不可以修改
    PubSub.subscribe('modifyEdit', (message, obj) => {
      let { dataSources } = this.state;

      dataSources[obj.index].edit = obj.boolean;
      this.setState({ dataSources });
    });
    //订阅，删除表格数据
    PubSub.subscribe('deleteDate', (message, index) => {
      let { dataSources } = this.state;

      Modal.confirm({
        title: '删除用户',
        content: `你确定要删除 ${dataSources[index].nickname} 用户吗？`,
        okText: '删除',
        cancelText: '取消',
        onOk: () => {
          this.deleteUserData([dataSources[index].id]);
        }
      });
    });
    //订阅，保存修改
    PubSub.subscribe('saveModify', (message, response) => {
      this.updateDataSource(response);
    });

    // 用于响应式显示分页
    if(+document.documentElement.offsetWidth < 700){
      this.setState({simple: true});
    }else{
      this.setState({simple: false});
    }
  }

  hangleChange = (pagination, filter, sorter) => {
    let orderType = 'id', order = 'asc', filterValue = '0';
    if(sorter.field){
      if(sorter.field === 'loginDate'){
        orderType = 'login_date';
      }else{
        orderType = 'id';
      }
      order = sorter.order.slice(0, -3);
    }

    if(filter.loginDate && filter.loginDate.length){
      filterValue = filter.loginDate[0];
    }
    this.getUserData(pagination.current, order, orderType, filterValue);
  }

  //修改数据源，并向保存到数据库
  updateDataSource = ({username, nickname, index}) => {
    const {dataSources} = this.state;
    let dataSource = dataSources[index];

    if(dataSource.nickname !== nickname || dataSource.username !== username){
      console.log(username, nickname);
      axios({
        method: 'post',
        url: interfaceLibs.url + '/admin/manage/updateUser',
        data: qs.stringify({
          username,
          nickname,
          id: dataSource.id,
          check: dataSource.username !== username,     //如果是更改username就需要判断存不存在该用户，反之不需要
        }),
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        const { data } = response;
        if(data.type){
          this.getUserData();
        }else{
          Modal.error({
            title: '用户名已存在',
            content: '该用户名已被使用，请换一个试试',
            okText: '确定',
          });
        }
      }).catch((err) => {
        throw err;
      });
    }

    dataSource.edit = false;
    this.setState({ dataSources });

  }

  //批量删除用户
  batchDelete = () => {
    const { selected } = this.state;
    Modal.confirm({
      title: '删除用户',
      content: `你确定要批量删除 ${selected.join(',')} 用户吗？`,
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        this.deleteUserData(selected);
      }
    });
  }

  //删除用户数据
  deleteUserData = (id) => {
    axios({
      method: 'post',
      url: interfaceLibs.url + '/admin/manage/deleteUser',
      data: qs.stringify({
        id: JSON.stringify(id),
      }),
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      const { data } = response;
      if(data.type){
        this.getUserData();
      }
    }).catch((err) => {
      throw err;
    });
  }

  //删除未30天未登录的用户
  deleteUnLogin = () => {
    Modal.confirm({
      title: '删除用户',
      content: `你确定要批量删除30天未登录的用户吗？`,
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'post',
          url: interfaceLibs.url + '/admin/manage/deleteUser/deleteUnLogin',
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then((response) => {
          const { data } = response;
          if(data.type){
            this.getUserData();
          }
        }).catch((err) => {
          throw err;
        });
      }
    });
  }

  //获取用户数据
  getUserData = (current = this.state.current, order = this.state.order, orderType = this.state.orderType, filter = this.state.filter, pageSize = this.state.pageSize) => {

    this.setState({loading: true});
    axios({
      method: 'post',
      url: interfaceLibs.url + '/admin/manage',
      data: qs.stringify({
        current,
        pageSize,
        orderType,
        order,
        filter,
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;
      if(data) {
        this.setState({current, loading: false, dataSources: data.dataSources, total: data.total, filter});
      }
    }).catch((err) => {
      throw err;
    });
  }

  render (){
    const { loading, dataSources, simple, total, pageSize, rowSelection, selected } = this.state;

    return (
      <div className="admin__main--content_manage">
        <div className="admin__main--content_manag-btn">
          <div>
            {selected.length? <Button type="danger" onClick={this.batchDelete}>批量删除</Button>: null}
          </div>
          <Button type="danger" onClick={this.deleteUnLogin}>删除30天未登录的用户</Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSources}
          size ={'small'}
          locale = {{filterConfirm: '确定', filterReset: '重置', emptyText: "暂无数据"}}
          pagination = {{total, pageSize, hideONSinglePage: true, showQuickJumper: true, simple}}
          loading = {loading}
          scroll={{ x: 1100}}
          rowSelection = {rowSelection}
          expandedRowRender = {({achievement}) => (
            <div className="table__redundant">
              <p style={{ margin: 0 }}>最高分：{achievement.max}</p>
              <p style={{ margin: 0 }}>最低分：{achievement.min}</p>
              <p style={{ margin: 0 }}>平均分：{achievement.avg}</p>
              <p style={{ margin: 0 }}>及格数：{achievement.pass}</p>
              <p style={{ margin: 0 }}>听写数： {achievement.total}</p>
              <p style={{ margin: 0 }}>未惩罚数：{achievement.unpunish}</p>
              <p style={{ margin: 0 }}>及格率：{(((achievement.pass)/(achievement.total))*100).toFixed(1)}%</p>
            </div>
          )}
          onChange = {this.hangleChange}
        />
      </div>
    )
  }
}
