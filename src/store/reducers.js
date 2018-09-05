import { combineReducers } from 'redux';

import { INC,INC2 } from './action-types';

function demo (state = 0, action){
  switch (action.type){
    case INC:
      return state+1;
    default :
      return state;
  }
}

function demo2 (state = 1, action){
  switch (action.type){
    case INC2:
      console.log(state);
      return state+2;
    default:
      return state;
  }
}

export default combineReducers({
  demo,
  demo2
});
