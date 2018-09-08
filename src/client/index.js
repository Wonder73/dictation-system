import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter as Router } from 'react-router-dom';

import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker.js';

render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
