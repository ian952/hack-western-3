import Immutable from 'immutable';
import { USER_JOIN, SET_NAME, MAKE_LEAD } from '../constants/ActionTypes.js';

const initialState = Immutable.fromJS({
	user: {},
	userList: [],
	host: false
});

export default function UserStore(state = initialState, action) {
	let newState = state;
	
	switch (action.type) {

	case SET_NAME:
		newState = state.set('user', Immutable.fromJS(action.response));
		return newState;

	case USER_JOIN: 
		newState = state.updateIn('userList', (userList) => userList.push(action.response));
		return newState;

	case MAKE_LEAD:
		newState = state.set('host', true)
		return newState;

	default: 
		return state;
	}
}
