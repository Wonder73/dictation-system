import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './containers';
import store from './store';
import registerServiceWorker from './registerServiceWorker.js';

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
