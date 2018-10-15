import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

import './chart.scss';
import interfaceLib from '../../../libs/interface';

const { RangePicker } = DatePicker;

export default class MyChart extends Component {
  constructor (props){
    super(props);
    this.state = {
      data: [
        {
          year: '2018-8-7',
          value: 10
        },
      ],    //折线数据
      dateRange:[],  //查询时间范围
    };
  }

  componentDidMount(){
    this.initData();
  }

  //第一次加载时初始化折线图
  initData = () => {
    const { dateRange } = this.state;

    axios({
      method: 'post',
      url: `${interfaceLib.url}/admin/all/loginRecord`,
      data: qs.stringify({
        dateRange: JSON.stringify(dateRange),
      }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then((response) => {
      const { data } = response;

      if(data.type){
        this.setDataSource(data.data);
      }
    }).catch((err) => {
      throw err;
    });
  }

  //点击查询
  seletct = () => {
    this.initData();
  }

  setDataSource = (mysqlData) => {
    
    let data = [];   //数据源
    let { dateRange } = this.state;

    if(!dateRange.length) dateRange = [moment().subtract(6, 'days'), moment()];
    
    const startTime = new Date(dateRange[0]);   //开始日期
    const endTime = new Date(dateRange[1]);    //结束日期

    const startYear = startTime.getFullYear();    
    const startMonth = startTime.getMonth()+1;    
    const startDate = startTime.getDate();   
    
    const endYear = endTime.getFullYear();
    const endMonth = endTime.getMonth()+1;
    const endDate = endTime.getDate();

    if(!dateRange.length) return false;

    //循环年
    for(let year = startYear; year <= endYear; year++){
      //循环月
      for(let month = startMonth; year !== endYear || month !== endMonth+1; month++){
        if(month === 13) month = 1;
        // debugger;
        //计算这个月的天数
        let day = 0;
        if(month % 2 === 0) day = 30;
        if(month === 2) {
          if(year%400 === 0 && (year%100 !== 0 && year%4 === 0)){
            day = 28;
          }else{
            day = 29;
          }
        }
        if(month % 2 !== 0 || month === 7) day = 31;

        //循环日
        let date = 1;
        if(month === startMonth){
          date = startDate;
        }
        for(; date < day && ( year !== endYear || month !== endMonth || date !== endDate+1 ); date++){
          const time = `${year}-${month < 10? `0${month}`: month}-${date < 10? `0${date}`: date}`;
          data.push({
            year: time,
            value: mysqlData[time]? mysqlData[time]: 0
          });
        }
      }
    }

    this.setState({ data });
  }

  //时间选择器数据改变
  datePickerChange = (dates, dateStrings) => {
    this.setState({ dateRange: dateStrings });
  }

  render (){
    const { data } = this.state;
    const cols = {
      value: {
        min: 0,
      },
      year: {
        tickInterval: 100,
        ticks: (() => {
          let array = [];
          const temp = Math.ceil(data.length/12);

          if(!data.length) return;
          array.push(data[0].year);
          for(let i = 0; i < data.length; i += temp){
            data[i+temp] && array.push(data[i+temp].year);
          }

          return array;
        })(),
        tickCount: 7,
      },
    };

    return (
      <div className="content-all__chart">
        <div className="content-all__chart--select">
          <RangePicker 
            disabledDate={(current) => current > moment().endOf('day')}
            ranges={{
              '今天': [moment(), moment()], 
              '本周': [moment().startOf('week'), moment().endOf('day')],
              '上周': [moment().day(-6), moment().day(0)],
              '本月': [moment().startOf('month'), moment().endOf('day')],
              '上个月':[moment().month(moment().get('month')-1).date(1), moment().subtract(moment().get('date'), 'days')],
              '今年': [moment().startOf('year'), moment()],
              '上一年': [moment().subtract(1, 'years').month(0).date(1), moment().subtract(moment().get('month'), 'months').subtract(moment().get('date'), 'days')],
            }}
            onChange = {this.datePickerChange}
          />
          <Button type="primary" size="small" onClick={this.seletct}>查询</Button>
        </div>
        <div className="content-all__chart--chart">
          <Chart height={300} data={data} scale={cols} padding={[15, 35, 35, 35]} forceFit>
            <Legend />
            <Axis name="value" />
            <Axis name="year" />
            <Tooltip
              crosshairs={{type: 'type'}}
            />
            <Geom type="line" position="year*value" size={2} tooltip={['year*value', (year, value) => {
              return {
                name: '访问量',
                value
              };
            }]} />
            
          </Chart>
        </div>
      </div>
    );
  }
}
