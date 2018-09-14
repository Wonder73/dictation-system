import axios from 'axios';
import qs from 'qs';

import { INSERT, SELECT } from './action-types';
import interfaceLib from '../libs/interface';

export const insert = (words) => ({'type': INSERT, 'data': words});
export const select = (user) => {
  const { id, username } = user;
  return (dispatch) => {
    axios({
      method: 'post',
      url: interfaceLib.url + '/operation/select',
      data: qs.stringify({
        userId: id,
        username,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
      const { data } = response;
      if(data.type){
        dispatch({'type': SELECT, 'data': JSON.parse(data.content)});
      }
    });
  }
}
