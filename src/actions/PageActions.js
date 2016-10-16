import { JOIN_ROOM, START_VOTE, GET_RESULTS } from '../constants/ActionTypes';

export function joinRoom(roomID, personList) {
	return { type: JOIN_ROOM, response: { roomID, personList }};
}

export function startVote() {
	return { type: START_VOTE };
}