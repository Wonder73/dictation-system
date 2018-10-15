import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { App } from './containers';
import store from './store';
import registerServiceWorker from './registerServiceWorker.js';

render((
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
