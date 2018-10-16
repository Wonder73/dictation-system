import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
//eslint-disable-next-line
import { BrowserRouter, HashRouter as Router, Route} from 'react-router-dom';

import { App } from './containers';
import store from './store';
import registerServiceWorker from './registerServiceWorker.js';

render((
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <Router>
        <div>
          <Route path="/" component={App} />
        </div>
      </Router>
    </LocaleProvider>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
