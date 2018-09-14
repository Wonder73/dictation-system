import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dictation.scss';
import { DictationConfig } from '../../components'

export default class Dictation extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: [],
    }
  }

  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  componentWillReceiveProps (newProps){
    this.setState({ words: newProps.words });
  }

  render (){

    return (
      <div className="dictation">
        <h1>dictation</h1>
        <DictationConfig history={this.props.history} />
      </div>
    );
  }
}
