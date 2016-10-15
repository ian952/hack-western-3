import { combineReducers } from 'redux';
import UserStore from './UserReducer';
import PageStore from './PageReducer';

export default combineReducers(
  Object.assign({}, {
  	UserStore,
  	PageStore
  })
);