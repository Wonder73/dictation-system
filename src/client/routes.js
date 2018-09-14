import { NavLink, Switch, Route } from 'react-router-dom';
import React from 'react';

import App from './containers/app';
import Index from './containers/index';
import Write from './views/write/write';
import Dictation from './views/dictation/dictation';
import Review from './views/review/review';
import Login from './views/login/login';

export default  (
  <Route path="/" component={App}>
    <Route path="" component={Index}/>
    <Route path="login" component={Login} />登录
    <Route path="review" component={Review} />复习
    <Route path="dictation" component={Dictation} />听写
    <Route path="write" component={Write} />写入
    {/* <Route path="" component={Index} />首页 */}
  </Route>
)
