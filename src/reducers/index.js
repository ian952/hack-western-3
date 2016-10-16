import { combineReducers } from 'redux';
import UserStore from './UserReducer';
import PageStore from './PageReducer';
import QuestionStore from './QuestionStore';

export default combineReducers(
  Object.assign({}, {
  	UserStore,
  	PageStore,
  	QuestionStore
  })
);