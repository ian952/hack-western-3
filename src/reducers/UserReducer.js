import Immutable from 'immutable';
import { USER_JOIN, SET_NAME } from '../constants/ActionTypes.js';

const initialState = Immutable.fromJS({
	name: '',
	userList: []
});

export default function AppState(state = initialState, action) {
	let newState = state;
	
	switch (action.type) {

	case SET_NAME:
		newState = state.set('name', action.response);
		return newState;

	case USER_JOIN: 
		newState = initialState.updateIn('userList', (userList) => userList.push(action.response));
		return newState;

	default: 
		return state;
	}
}
