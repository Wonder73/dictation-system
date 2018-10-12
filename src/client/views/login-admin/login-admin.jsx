import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Button, Input, Form, Icon, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';

import './login-admin.scss';
import interfaceLib from '../../libs/interface';

class LoginAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorInfo: '',
    };
  }

  componentWillMount() {
    //判断使用已经登录
    const admin = sessionStorage.getItem('admin');
    
    if(admin){
      this.props.history.push('/d-admin');
    }
  }

  //提交用户登录表单
  handleSubmit = (e) => {
    e.preventDefault();
    const {validateFields } = this.props.form;

    validateFields((err, values) => {
      if(!err){
        axios({
          method: 'post',
          url: `${interfaceLib.url}/admin/login`,
          data: qs.stringify(values),
          header: { 'Content-Type': 'application/x-www-form-urlencoded'},
          withCredentials: true 
        }).then((res) => {
          const { data } = res;
          if(data.type){
            sessionStorage.setItem('admin', JSON.stringify(data.data));
            this.props.history.push('/d-admin');
          }else{
            this.setState({errorInfo: data.info});
          }
        }).catch((err) => {
          throw err;
        });
      }
    });
  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const { errorInfo } = this.state;

    return (
      <div className="login-admin">
        <NavLink to="/" style={{'fontSize': 14, 'color': '#666', 'margin': '10px'}}>&lt; 返回听写系统</NavLink>
        <div className="login-admin__content">
          <h1>听写后台管理系统</h1>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item
              label = "用户名"
              required = {false}
            >
              {
                getFieldDecorator('username', {
                  rules: [
                    { 'required': true, 'message': '用户名不得为空' },
                    { validator: (rules, value, callback) => {
                      if(/[^0-9a-zA-Z.]/.test(value)){
                        callback('不得包含特殊字符');
                      }
                      callback();
                    } }
                  ]
                })(
                  <Input type="text" placeholder="输入管理员用户名" size="large" autoComplete="off" prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> } />
                )
              }
            </Form.Item>
            <Form.Item
              label = "密码"
              required = {false}
            >
              {
                getFieldDecorator('password', {
                  rules: [
                    { 'required': true, 'message': '密码不得为空' },
                    { 'validator': (rules, value, callback) => {
                      if(/[^0-9a-zA-Z.]/.test(value)){
                        callback('不得包含特殊字符');
                      }
                      callback();
                    } }
                  ]
                })(
                  <Input type="password" placeholder="输入管理员密码" size="large" autoComplete="off" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', { initialValue: false })(
                  <Checkbox>记住登录信息</Checkbox>
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
          <p className="error">{errorInfo}</p>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginAdmin);
