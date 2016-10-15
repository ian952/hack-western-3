import { USER_JOIN, SET_NAME } from '../constants/ActionTypes';

export function userJoin() {
	return { type: USER_JOIN, response: 'Bob' }
}

export function setName(name, userID) {
	return { 
		type: SET_NAME,
		response: {name: name, id: userID}
	}
}

export function makeRoom() {
	
}