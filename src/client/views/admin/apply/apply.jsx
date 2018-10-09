import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
import qs from 'qs';
import { Table, Button, Modal, Spin } from 'antd';

import './apply.scss';
import interfaceLib from '../../../libs/interface';
import columns from './table.js';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,   //等待加载
      pageSize: 10,    //一页显示的条数
      total: 0,        //总条数
      current: 1,     //当前页码
      order: 'asc',  //当前的排列方式
      filter: 0,    //当前的筛选方式
      simple: false,    //分页的动态显示
      selected: {},    //选中的数据
      rowSelection: {     //表格复选框
        onChange: (selectedRowKeys, selectedRows) => {
          const selected = {index: [], id: []};

          selected.id = selectedRows.map((value, index) => value.id);
          selected.index = selectedRows.map((value, index) => value.key);
          this.setState({ selected });
        }
      },
      dataSources: [],        //数据源
    }
  }

  componentDidMount (){
    this.getDataSources();

    //订阅删除数据
    PubSub.subscribe('applyDelete', (message, data) => {
      this.deleteData(JSON.stringify([data]));
    });
    //订阅允许数据
    PubSub.subscribe('applyAllow', (message, data) => {
      this.allowData(data);
    });

    // 用于响应式显示分页
    if(+document.documentElement.offsetWidth < 700){
      this.setState({simple: true});
    }else{
      this.setState({simple: false});
    }
  }

  //表格的一系列操作
  hangeChange = (pagination, filter, sorter) => {
    let order;
    if(filter.email){
      filter = filter.email[0];
    }else{
      filter = 0;
    }

    if(sorter.order && sorter.order === 'descend'){
      order = 'desc';
    }else{
      order = 'asc'
    }

    this.getDataSources(pagination.current, order, filter);
  }

  //获取数据源
  getDataSources = (current = 1, order = 'asc', filter = 0) => {
    const { pageSize } = this.state;
    this.setState({loading: true});
    axios({
      method: 'post',
      url: interfaceLib.url + '/admin/apply',
      data:qs.stringify({
        pageSize,
        current,
        order,
        filter,
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const content = response.data;
      if(content.type){
        const { data } = content;
        this.setState({loading: false, total: data.total, current, filter, order, dataSources: data.data});
      }
    }).catch((err) => {
      throw(err);
    });
  }

  //删除数据
  deleteData = (id) => {
    const { current, order, filter } = this.state;
    this.setState({loading: true});
    axios({
      method: 'post',
      url: interfaceLib.url + '/admin/apply/delete',
      data: qs.stringify({
        id,
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;
      if(data.type){
        this.setState({loading: false});
        this.getDataSources(current, order, filter);
      }
    }).catch((err) => {
      throw err;
    });
  }

  //批量删除数据
  batchDelete = () => {
    const { selected } = this.state;
    const id = JSON.stringify(selected.id);

    Modal.warning({
      title: '删除申请',
      content: `您确定要删除 ${id} 吗？`,
      okText: '删除',
      maskClosable: true,
      onOk: () => {
        this.deleteData(id);
      }
    });
  }

  //允许数据申请
  allowData = (index) => {
    const { dataSources, current, order, filter } = this.state;
    let data = [];

    if(index instanceof Array){
      for(let value of index){
        if(JSON.stringify(data).indexOf(`"${dataSources[value].email}"`) < 0){
          data.push({
            'applyId': dataSources[value].id,
            'username': dataSources[value].username,
            'nickname': dataSources[value].nickname,
            'email':    dataSources[value].email,
          });
        }
      }
    }else{
      data.push({
        'applyId': dataSources[index].id,
        'username': dataSources[index].username,
        'nickname': dataSources[index].nickname,
        'email':    dataSources[index].email,
      });
    }
    this.setState({loading: true});
    axios({
      method: 'post',
      url: interfaceLib.url + '/admin/apply/allow',
      data: qs.stringify({
        data: JSON.stringify(data),
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;

      if(data.type){
        this.getDataSources(current, order, filter);
        this.setState({loading: false});
      }
    }).catch((err) => {
      throw err;
    })
  }

  //批量允许
  batchAllow = () => {
    const { selected } = this.state;

    Modal.warning({
      title: '允许申请',
      content: `您将运行 ${selected.id.join(',')} 使用该系统`,
      okText: '允许',
      maskClosable: true,
      onOk: () => {
        this.allowData(selected.index);
      }
    });
  }

  //删除重复的内容
  deleteRepetition = () => {
    const { current, order, filter } = this.state;

    Modal.warning({
      title: '删除申请',
      content: `您确定要删除重复的内容吗？`,
      okText: '删除',
      maskClosable: true,
      onOk: () => {
        axios({
          method: 'get',
          url: interfaceLib.url + '/admin/apply/delete/repetition',
        }).then((response) => {
          const { data } = response;
          if(data.type){
            this.getDataSources(current, order, filter);
          }
        }).catch((err) => {
          throw err;
        });
      }
    });
  }

  render (){
    const { pageSize, total, simple, dataSources, rowSelection, selected, loading } = this.state;

    return (
      <div className="admin__main--content_apply">
        <Spin size="large" spinning={loading} >
          {
            (dataSources.length? (
              <div className="admin__main--content_apply-btn">
                <div className="batch">
                  {
                    (selected.id && selected.id.length? (
                      <div>
                        <Button type="primary" onClick={this.batchAllow}>批量允许</Button>
                        <Button type="danger" onClick={this.batchDelete}>批量删除</Button>
                      </div>
                    ): null)
                  }
                </div>
                <Button type="danger" onClick={this.deleteRepetition}>删除重复</Button>
              </div>
            ): null)
          }
          <Table
            columns = {columns}
            dataSource = {dataSources}
            size = 'small'
            pagination={{total, pageSize,  hideOnSinglePage: true, showQuickJumper: true, simple}}
            locale = {{filterConfirm: '确定', filterReset: '重置', emptyText: "暂无数据"}}
            scroll={{x: 650}}
            rowSelection={rowSelection}
            expandedRowRender = {({description}) => {
              return <p style={{'margin': 0}}>{description}</p>
            }}
            onChange = {this.hangeChange}
          />
        </Spin>
      </div>
    )
  }
}
