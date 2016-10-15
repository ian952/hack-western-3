import { combineReducers } from 'redux';
import UserStore from './UserReducer';

export default combineReducers(
  Object.assign({}, {
  	UserStore
  })
);