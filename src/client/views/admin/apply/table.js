import React from 'react';
import PubSub from 'pubsub-js';
import { Button, Modal } from 'antd';


export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    filters: [
      {text: '不重复', value: '1'},
      {text: '重复', value: '2'},
      {text: '去重复后', value: '3'},
      {text: '去掉的重复', value: '4'},
    ],
    filterMultiple: false,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operaion',
    render: (value, record, index) => {
      return (
        <div className="apply__table--operation">
          <Button type="primary" size="small" onClick={
            () => {
              Modal.warning({
                title: '运行申请',
                content: `您将运行 ${record.username} 使用该系统！`,
                okText: '允许',
                maskClosable: true,
                onOk: () => {
                  PubSub.publish('applyAllow', index);
                }
              });
            }
          }>允许</Button>
          <Button type="danger" size="small" onClick={
            () => {
              Modal.warning({
                title: '删除申请',
                content: `您确定要删除 ${record.username} 吗？`,
                okText: '删除',
                maskClosable: true,
                onOk: () => {
                  PubSub.publish('applyDelete', record.id);
                }
              });
            }
          }>删除</Button>
        </div>
      );
    }
  }
]
