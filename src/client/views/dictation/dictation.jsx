import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import './dictation.scss';
import { DictationConfig, DictationStart } from '../../components'

export default class Dictation extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: {     //默认配置信息
        'voice': 'female',   //声音
        'speed': 4,          //语速
        'dictationCount': 10,   //听写数
        'wordTypes': {         //要听写的单词
          'type': '1',
          'range': [0, 20],
        },
        'autoPlay': {         //是否自动播放
          'type': false,
          'interval': 15,
        }
      },
      words: [],   //单词表
      status: false,   //听写单词的状态，开始或者在在准备
      dictationWords: [],  //听写的单词
    }
  }

  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  componentWillReceiveProps (newProps){
    this.setState({ words: newProps.words });
  }

  componentWillMount (){
    PubSub.subscribe('changeConfig', (msg, config) => {
      const { words } = this.state;      //单词表
      let { dictationWords } = this.state;   //用进行听写的单词

      //获取要听写的单词
      switch(+config.wordTypes.type){
        case 1:   //最新10个
          dictationWords = words.slice(-10);
          break;
        case 2:   //最新20个
          dictationWords = words.slice(-20);
          break;
        case 3:   //最新30个
          dictationWords = words.slice(-30);
          break;
        case 4:    //最新自定义个数个
          dictationWords = words.slice(config.wordTypes.range[0], config.wordTypes.range[1]);
          break;
        default: break;
      }

      if(dictationWords.length < +config.dictationCount){
        config.dictationCount = dictationWords.length;
      }

      this.setState({ config, status: true, dictationWords });
    });
  }

  render (){
    const { config, status, dictationWords, words } = this.state;
    const { history } = this.props;
    
    return (
      <div className="dictation">
        <DictationConfig history={this.props.history} config={config} wordsCount={words.length}/>
        {
          (status? (
            <DictationStart config={config} dictationWords={dictationWords} history={history} />
          ): null)
        }
      </div>
    );
  }
}
