import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Button, Input, Icon, Modal, Form, AutoComplete } from 'antd';

import './login.scss';
import interfaceLib from '../../libs/interface';

class Login extends Component {
  constructor (props){
    super(props);
    this.state = {
      username: '',    //用户名
      error_info: '',  //登录错误信息
      loading: false,  //登录状态
      applyloading: false, //申请请求状态
      visible: false,  //显示申请表单
      dataSources:[],  //邮箱的下拉列表
      emailExists: false,    //用于判断邮箱是否存在
    };
  }

  componentDidMount (){
    const user = JSON.parse(sessionStorage.getItem('user'));    //用户信息
    if(user){
      this.props.history.push('/');
    }
  }

  /*用户名的双向绑定*/
  changeUsername = (e) => {
    let { username } = this.state;

    username = e.target.value.replace(/\s+/g,'');
    this.setState({username});
  }

  /*清空用户名*/
  emptyUsername = (e) => {
    let { username } = this.state;

    username = '';
    this.setState({username});
  }

  /*登录方法*/
  loginAction = () => {
    let { username, loading, error_info } = this.state;

    loading = true;
    this.setState({loading});

    /*是否为空*/
    if(!username){
      error_info = '用户名不可以为空';
      loading = false;
      this.setState({loading, error_info});
      return ;
    }
    /*发送ajax请求*/
    axios({
      method: 'post',
      url: interfaceLib.url + '/login/login',
      data: qs.stringify({
        username,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
      const data = response.data;
      loading = false;
      if(data.type){
        sessionStorage.setItem('user', JSON.stringify(data.info));
        this.props.history.push('/');
      }else{
        error_info = data.info;
        username = '';
        this.setState({username, loading, error_info});
      }
    }).catch((err) => {
      throw err;
    });
  }

  //显示申请表单
  visibleModal = (visible) => {
    this.setState({ visible });
  }

  //提交申请表单
  handleSumbit = (e) => {
    e.preventDefault();
    const { setFieldsValue, validateFields } = this.props.form;
    this.setState({'applyLoading': true});
    validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'post',
          url: interfaceLib.url + '/login/apply',
          data: qs.stringify(values),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then((response) => {
          const { data } = response;
          if(data.type) {
            Modal.success({
              title: '申请成功',
              content: '申请通过时，我们将会通过发邮箱的方式进行通知，谢谢支持！！！',
              okText: '知道了',
              onOk: () => {
                this.setState({'applyLoading': false});
                this.visibleModal(false);
                setFieldsValue({username: '', nickname: '', email: '', description: ''});
              }
            });
          }
        }).catch((err) => {
          throw err;
        });
      }
    });
  }

  //邮箱的下拉列表
  handleSearch = (value) => {
    let { dataSources } = this.state;
    const suffix = ['@qq.com','@163.com','@gmail.com','@outlook.com'];
    let prefixValue = '';   //‘@’符号前面面
    let suffixValue = '';   //‘@’符号后面
    if(value.includes('@')){
      const temp = value.split('@');
      prefixValue = temp[0];
      suffixValue = temp[1];
    }else{
      prefixValue = value;
    }

    //筛选出符合的值
    let map = suffix.map((value, index) => {
      if(value.includes(suffixValue)){
        return prefixValue + value;
      }
      return null;
    });
    //去掉undefind
    let filter = map.filter((v,index) => (v && value !== v));

    dataSources = value?[
      value,
      ...filter,
    ]:[];

    this.setState({dataSources});
  }

  //检查邮箱是否被注册
  checkEmail = (value, e) => {
    const { setFieldsValue } = this.props.form;

    if(/[\w]+@[a-zA-Z0-9]{2,5}.[a-zA-Z]{2,3}/.test(value)){
      axios({
        method: 'post',
        url: interfaceLib.url + '/login/checkEmail',
        data: qs.stringify({
          email: value,
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then((response) => {
        const { data } = response;

        if(data.type){
          this.setState({emailExists: true});
          setFieldsValue({'email': value});
        }else{
          this.setState({emailExists: false});
          setFieldsValue({'email': value});
        }
      }).catch((err) => {
        throw err;
      });
    }
  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const { username, loading, error_info, visible, dataSources, emailExists, applyloading } = this.state;
    const layoutItem = {
      labelCol: {span: 4},
      wrapperCol: {span: 18}
    };

    const suffix = (username? <Icon type="close-circle" className="login__Input--close" onClick={this.emptyUsername} />: '');

    return (
      <div className="login">
        <h1>用户登录</h1>
        <Input
          prefix = { <Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}} /> }
          suffix = {suffix}
          placeholder = "输入你的用户名"
          value = {username}
          onChange = {this.changeUsername}
          onPressEnter = {this.loginAction}
        />
        <Button type="primary" className="login__button" loading={loading} onClick={this.loginAction}>登录</Button>
        <p className="login__error">{error_info}</p>
        <p className="register" onClick={(e) => { this.visibleModal(true); }}>申请账号</p>

        <Modal
          title = "申请账号"
          visible = {visible}
          keyborad = {true}
          okText = "确定"
          cancelText = "取消"
          footer={null}
          onCancel = {() => {
            this.visibleModal(false);
          }}
        >
          <Form layout="horizontal" onSubmit={this.handleSumbit}>
            <Form.Item
              label="用户名"
              {...layoutItem}
              required = {true}
            >
              { getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名不得为空!' },
                  { min: 6, max: 20, message: '输入6~20位的用户名'},
                  { validator: (rules, value, callback) => {
                    if(/\W/.test(value)){
                      callback('不得包含特殊字符');
                    }
                    callback();
                  }}
                ],
              })(
                <Input type="text" placeholder="输入6~12位的用户名" autoComplete="off" />
              ) }
            </Form.Item>
            <Form.Item
              label="昵称"
              {...layoutItem}
              required = {true}
            >
              { getFieldDecorator('nickname', {
                rules: [
                  { required: true, message: '昵称不可以为空' },
                  { min: 2, max: 10, message: '输入2~10位的昵称' },
                  { whitespace: true, message: '不得包含特殊字符'}
                ]
              })(
                <Input type="text" placeholder="输入2~10位昵称" autoComplete="off" id="error" />
              ) }
            </Form.Item>
            <Form.Item
              label="邮箱"
              {...layoutItem}
              required = {true}
            >
              { getFieldDecorator('email', {
                initialValue: '11111',
                rules: [
                  { required: true, message: '邮箱不可以为空' },
                  { pattern: /[\w]+@[a-zA-Z0-9]{2,5}.[a-zA-Z]{2,3}/, message: '邮箱格式不正确'},
                  { validator: (rules, value, callback) => {
                    if(emailExists) {
                      callback('该邮箱已别注册');
                    }
                    callback();
                  } }
                ]
              })(
                <div>
                  <AutoComplete dataSource={dataSources} onSearch={this.handleSearch} placeholder="输入邮箱" onBlur={this.checkEmail}/>
                </div>
              ) }
            </Form.Item>
            <Form.Item
              label="描述"
              {...layoutItem}
            >
              { getFieldDecorator('description')(
                <Input.TextArea teyp="text" placeholder="描述" autosize={{minRows: 4, maxRows: 6}} style={{'resize': 'none'}} />
              ) }
            </Form.Item>
            <Form.Item style={{'textAlign': 'center', 'margin': '0'}}>
              <Button type="primary" htmlType="submit" style={{width: 150}} loading={applyloading}>提交</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Login);
