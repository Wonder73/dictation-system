import React from 'react';
import PropTypes from 'prop-types';

export default class Home extends React.Component{
  static propTypes = {
    demo2: PropTypes.number.isRequired,
    add2: PropTypes.func.isRequired
  }

  add2 = () => {
    const { add2 } = this.props;
    add2();
  }

  render (){
    const {demo2} = this.props;

    return (
      <div className="home">
        <h2 onClick={this.add2}>hello wrold{demo2}</h2>
      </div>
    )
  }
}
