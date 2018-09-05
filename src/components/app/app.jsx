import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink, Route} from 'react-router-dom';
import store from '../../store';
import { Provider } from 'react-redux';

import './app.scss'
import Home from '../../containers/home';

export default class App extends Component {
  static propTypes = {
    demo: PropTypes.number.isRequired,
    demo2: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired,
    // add2: PropTypes.func.isRequired,
  }

  add = () => {
    const {add} = this.props;
    add();
  }

  render (){
    const { demo,demo2 } = this.props;
    console.log(1,':',demo2);
    return (
      <div className="app">
        <button onClick={this.add}>
          <NavLink to="/home">Hello World{demo}</NavLink>
        </button>
        <Provider store={store}>
          <Route path="/home" component={Home}></Route>
        </Provider>
      </div>
    )
  }
}
