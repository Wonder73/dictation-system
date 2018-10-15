import React, { Component } from 'react';

import './all.scss';
import { AdminExhibit, AdminChart } from '../../../components';

export default class All extends Component {
  constructor (props){
    super(props);
    this.state = {
      
    };
  }

  render (){
   
    return (
      <div className="admin__main--content_all">
        <AdminExhibit />
        <AdminChart />
      </div>
    );
  }
}
