import React, { Component } from 'react';
import { Row, Col } from 'antd';

const RowStyle = {
  'type': 'flex',
  'justify': 'center',
  'align': 'middle',
  'gutter': 10
}

export default class CheckWords extends Component {

  render (){
    const { didDictationWords, values, span } = this.props;

    return (
      <div className="check__content">
        <Row {...RowStyle}>
          <Col {...span}>
            <Row {...RowStyle} style={{'padding': '5px 0'}}>
              <Col style={{'fontSize': '14px', 'color': '#666'}}>单词源</Col>
            </Row>
            {didDictationWords.map((value, index) => {
              return (
                <Row {...RowStyle} style={{'borderBottom': '1px solid #ddd', 'padding': '5px 0'}} key={index}>
                  <Col style={{'fontSize': '18px'}}>{value.english}</Col>
                  <Col style={{'fontSize': '15px'}}>{value.parts}.{value.chinese}</Col>
                </Row>
              )
            })}
          </Col>
          <Col {...span}>
            <Row {...RowStyle} style={{'padding': '5px 0'}}>
              <Col style={{'fontSize': '14px', 'color': '#666'}}>听写</Col>
            </Row>
            {
              (() => {
                let html = [];

                for(let value in values){
                  html.push(
                    <Row {...RowStyle} style={{'borderBottom': '1px solid #ddd', 'padding': '5px 0', 'color': (!values[value].pass? '#ff4d4f': 'rgba(0, 0, 0, 0.65)')}} key={value}>
                      <Col style={{'fontSize': '18px'}}>{values[value].english? values[value].english: '空空'}</Col>
                      <Col style={{'fontSize': '15px'}}>{values[value].chinese? values[value].chinese: '空空'}</Col>
                    </Row>
                  );
                }

                return html;
              })()
            }
          </Col>
        </Row>
      </div>
    );
  }
}
