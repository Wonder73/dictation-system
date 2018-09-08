import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import './app.scss';
import Index from '../../views/index/index';
import Write from '../../views/write/write';
import Dictation from '../../views/dictation/dictation';
import Review from '../../views/review/review';

export default class App extends Component {

  render (){

    return (
      <div className="app">
        <NavLink to="/" activeClassName="active">返回首页</NavLink>
        <Switch>
          <Route path="/review" component={Review} />复习
          <Route path="/dictation" component={Dictation} />听写
          <Route path="/write" component={Write} />写入
          <Route path="/" component={Index} />首页
        </Switch>
      </div>
    )
  }
}
