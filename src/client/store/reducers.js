import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import { INSERT, SELECT } from './action-types'

const defaultState = [{
  english: '',
  parts: '',
  chinese: '',
}]

function dictationSystem(state = defaultState, action){
  switch(action.type){
    case INSERT:
      return action.data;
    case SELECT:
      return action.data;
    default :
      return state;
  }
}

export default combineReducers({
  dictationSystem,
  routing: routerReducer
});
