import { combineReducers } from 'redux';

import { INC } from './action-types';

function demo (state = 0, action){
  switch (action.type){
    case INC:
      return state+1
    default :
      return state;
  }
}

export default combineReducers({
  demo
});
