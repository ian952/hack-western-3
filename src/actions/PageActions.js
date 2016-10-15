import { JOIN_ROOM, START_VOTE, GET_RESULTS } from '../constants/ActionTypes';

export function joinRoom(roomID) {
	return { type: JOIN_ROOM, response: roomID};
}