import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './app.scss'

export default class App extends Component {
  static propTypes = {
    demo: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired,
  }

  add = () => {
    const {add} = this.props;
    add();
  }

  render (){
    const { demo } = this.props;
    return (
      <div className="app">
        <button onClick={this.add}>
          <NavLink to="/hemo">Hello World{demo}</NavLink>
        </button>
      </div>
    )
  }
}
