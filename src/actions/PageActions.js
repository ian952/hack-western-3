import { JOIN_ROOM, START_VOTE, GET_RESULTS, GET_LOC } from '../constants/ActionTypes';

export function joinRoom(roomID, personList) {
	return { type: JOIN_ROOM, response: { roomID, personList }};
}

export function setLoc() {
	return { type: GET_LOC };
}
export function startVote(question) {
	return { type: START_VOTE, response: question };
}