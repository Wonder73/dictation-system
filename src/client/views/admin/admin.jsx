import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Route, Switch, Redirect } from 'react-router-dom';


import './admin.scss';
import { AdminSide, AdminHeader } from '../../components';
import All from './all/all';
import Manage from './manage/manage';
import Apply from './apply/apply';

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      inlineCollapsed: true,
    }
  }

  componentDidMount () {
    PubSub.subscribe('updateInlineCollapsed', (message, value) => {
      this.fold();
    })
  }

  //展开或者折叠左侧菜单
  fold = () => {
    let { inlineCollapsed } = this.state;

    inlineCollapsed = !inlineCollapsed;

    this.setState({inlineCollapsed})
  }

  render (){
    const { inlineCollapsed } = this.state;

    return (
      <div className="admin">
        <AdminSide inlineCollapsed={inlineCollapsed} />

        <div className="admin__main" style={{paddingLeft: (inlineCollapsed? 85: 155)}}>
          <AdminHeader inlineCollapsed={inlineCollapsed} />
          <div className="admin__side--content">
            <Switch>
              <Route path="/d-admin/manage" component={Manage} />
              <Route path="/d-admin/apply" component={Apply} />
              <Route path="/d-admin/" component={All} />
              <Redirect to="/d-admin/" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
