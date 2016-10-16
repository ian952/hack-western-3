import Immutable from 'immutable';
import { USER_JOIN, SET_NAME, MAKE_LEAD, JOIN_ROOM } from '../constants/ActionTypes.js';

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
		newState = state.set('userList', Immutable.fromJS(action.response));
		return newState;

	case JOIN_ROOM:
		if (action.response.personList) {
			newState = state.set('userList', Immutable.fromJS(action.response.personList));
		}
		return newState;

	case MAKE_LEAD:
		newState = state.set('host', true)
		newState = newState.update('userList', (userList) => userList.push(state.get('user')));
		return newState;

	default: 
		return state;
	}
}
