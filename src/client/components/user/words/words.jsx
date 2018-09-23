import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Input, Button, Pagination } from 'antd';
import axios from 'axios';
import qs from 'qs';

import './words.scss';
import interfaceLib from '../../../libs/interface';

const rowStyle = {
  'type': 'flex',
  'align': 'middle',
  'justify': 'center',
  'gutter': 10
}

export default class Words extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 1,    //当前页码
      pageSize: 10,     //一页显示的条数
      simple: false,   // 用于响应式显示分页
      searchButton: false, //搜索按钮的显示模式
      order: 'desc',     //排序，默认降序
      words: [],        //后代获取的单词列表
      userWords: []   //经过修改的单词列表， 多了是否编辑按钮
    }
  }

  componentDidMount (){
    const user = JSON.parse(sessionStorage.getItem('user'));

    axios({
      method: 'post',
      url: interfaceLib.url + '/user/getWords',
      data: qs.stringify({
        id: user.id,
        username: user.username,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
      const {data} = response;

      if(data.type){
        this.setState({words: JSON.parse(data.content)});
        //初始化userWords，因为没有搜索条件，所以显示所有的内容
        this.filterSearchContent();
      }
    }).catch((err) => {
      console.log(err);
    })

    // 用于响应式显示分页
    if(+document.documentElement.offsetWidth < 350){
      this.setState({simple: true,});
    }else{
      this.setState({simple: false,});
    }

    if(+document.documentElement.offsetWidth < 370){
      this.setState({searchButton: true, });
    }else{
      this.setState({searchButton: false, });
    }
  }

  //搜索功能
  search = () => {
    const searchValue = this.searchValue.input.value;
    this.filterSearchContent(searchValue);
    this.searchValue.input.value = '';
  }

  //生成搜索列表
  filterSearchContent = (searchValue) => {
    const { words } = this.state;
    let userWords = [];

    words.forEach((word, index) => {
      let word_temp = Object.assign({}, word);
      if(searchValue && !word_temp.english.includes(searchValue) && !word_temp.parts.includes(searchValue) && !word_temp.chinese.includes(searchValue)){
        return;
      }
      word_temp.key = index;
      word_temp.edit = false;
      userWords.push(word_temp);
    });
    this.setState({userWords});
  }

  //页码改变
  pageChange = (page, pageSize) => {
    this.setState({current: page});
  }

  //渲染单词列表
  renderRowWords = (current) => {
    let { userWords, pageSize, order } = this.state;
    let html = [];   //用于存储html
    let num = (current - 1) * pageSize;   //分页，每一页内容的下标
    let orderUserWords = Object.assign([],userWords);

    if(order === 'desc') {
      orderUserWords = Object.assign([],orderUserWords.reverse());
    }

    for(let i = num; (i < num + parseInt(pageSize, 10) && i < orderUserWords.length); i++){
      if(!orderUserWords[i].edit){
        html.push(
          <Row {...rowStyle} key={i} >
            <Col span={8}><span>{orderUserWords[i].english}</span></Col>
            <Col span={2}><span>{orderUserWords[i].parts}.</span></Col>
            <Col span={5}><span>{orderUserWords[i].chinese}</span></Col>
            <Col span={9}>
              <Button type="primary" size="small" ghost="true" style={{'fontSize': '12px', 'margin': '0 5px'}} onClick={(e) => { this.handleEdit(e, i, true) }}>修改</Button>
              <Button type="danger" size="small" style={{'fontSize': '12px', 'margin': '0 5px'}} onClick={(e) => { this.handleDelete(e, i) }}>删除</Button>
            </Col>
          </Row>
        );
      }else{
        html.push(
          <Row {...rowStyle} key={i} >
            <Col span={8}><Input type="text" placeholder="输入英文" defaultValue={orderUserWords[i].english} /></Col>
            <Col span={2}><Input type="text" placeholder="输入词性" defaultValue={orderUserWords[i].parts} /></Col>
            <Col span={5}><Input type="text" placeholder="输入中文" defaultValue={orderUserWords[i].chinese} /></Col>
            <Col span={9}>
              <Button type="primary" size="small" ghost="true" style={{'fontSize': '12px', 'margin': '0 5px'}} onClick={(e) => {this.handleSave(e, i)}}>保存</Button>
              <Button type="danger" size="small" style={{'fontSize': '12px', 'margin': '0 5px'}} onClick={(e) => { this.handleEdit(e, i, false) }}>取消</Button>
            </Col>
          </Row>
        );
      }
    }

    return html;
  }

  /*点击修改单词 e:事件处理，index:单词对应的下标, boolean:点击的是修改还是取消*/
  handleEdit = (e, index, boolean) => {
    let { userWords, order } = this.state;

    //修改倒序时的index
    if(order === 'desc'){
      index = userWords.length-index-1;
    }

    userWords[index].edit = boolean;
    this.setState({ userWords });
  }

  //处理保存
  handleSave = (e, index) => {
    const inputDoms = e.target.parentNode.parentNode.querySelectorAll('input');   //获取输入框信息
    const { userWords, words, order } = this.state;

    //修改倒序时的index
    if(order === 'desc'){
      index = userWords.length-index-1;
    }

    //userWords和words的内容
    if(inputDoms[0].value && inputDoms[0].value !== userWords[index].english){
      words[userWords[index].key].english = userWords[index].english = inputDoms[0].value;
    }
    if(inputDoms[1].value && inputDoms[1].value !== userWords[index].parts){
      words[userWords[index].key].parts = userWords[index].parts = inputDoms[1].value;
    }
    if(inputDoms[2].value && inputDoms[2].value !== userWords[index].chinese){
      words[userWords[index].key].chinese = userWords[index].chinese = inputDoms[2].value;
    }

    userWords[index].edit = false;
    this.setState({userWords, words});

    //修改数据库
    this.modifyWords();
  }

  //处理删除
  handleDelete = (e, index) => {
    const { userWords, words, order } = this.state;

    //修改倒序时的index
    if(order === 'desc'){
      index = userWords.length-index-1;
    }
    
    words.splice(userWords[index].key, 1);
    userWords.splice(index, 1);

    this.setState({ userWords, words });

    //修改数据库
    this.modifyWords();
  }

  //处理排序
  handleOrder = () => {
    let { order } = this.state;

    if(order === 'desc'){
      order = 'asc';
    }else{
      order = 'desc';
    }

    this.setState({order});
  }

  //发送ajax请求，修改数据库中的内容
  modifyWords = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { words } = this.state;

    axios({
      method: 'post',
      url: interfaceLib.url + '/user/modifyWords',
      data: qs.stringify({
        id: user.id,
        username: user.username,
        words: JSON.stringify(words),
      }),
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
    }).catch((err) => {
      console.log(err);
    });
  }

  render (){
    const { pageSize, simple, searchButton, userWords, words, current } = this.state;

    return (
      <div className="user__words">
        <div className="user__words--operation">
          <div className="user__words--opeartion_search">
            <Input type="text" placeholder="输入搜索内容" ref={(input) => (this.searchValue = input)} onPressEnter={this.search} />
            {
              (!searchButton? (
                <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
              ): (
                <Button type="primary" icon="search" onClick={this.search}/>
              ))
            }
          </div>
        </div>
        <div className="user__words--order"><span>单词数：{words.length}</span><span onClick={this.handleOrder}>排序</span></div>
        <div className="user__words--content">
          <Row {...rowStyle} >
            <Col span={8}><span>英文</span></Col>
            <Col span={2}><span>词性</span></Col>
            <Col span={5}><span>中文</span></Col>
            <Col span={9}>操作</Col>
          </Row>
          {
            userWords.length?(
              this.renderRowWords(current)
            ):(<Row {...rowStyle}><Col><p style={{'fontSize': '15px', 'margin': '10px 0'}}>暂无数据 <NavLink to="/write">单词写入</NavLink></p></Col></Row>)
          }
        </div>
        <div className="user__words--pagination">
          <Pagination total={userWords.length} pageSize={pageSize} simple={simple} showQuickJumper={true} hideOnSinglePage={true} onChange={this.pageChange} current={current} />
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}
