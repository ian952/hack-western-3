import { USER_JOIN, SET_NAME, MAKE_LEAD } from '../constants/ActionTypes';

export function userJoin(peopleList) {
	return { type: USER_JOIN, response: peopleList };
}

export function setName(name, userID) {
	return { 
		type: SET_NAME,
		response: {name: name, id: userID}
	};
}

export function makeLead() {
	return {
		type: MAKE_LEAD
	};
}