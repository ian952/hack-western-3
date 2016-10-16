import { FINISHED_QUESTION, UPDATE_VOTES } from '../constants/ActionTypes';

export function finishedQuestion(roomID, personList) {
	return { type: FINISHED_QUESTION };
}

export function updateVotes(answerList) {
	return { type: UPDATE_VOTES, response: answerList};
}