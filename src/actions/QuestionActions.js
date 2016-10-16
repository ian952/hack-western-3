import { FINISHED_QUESTION, UPDATE_VOTES, SHOW_RESULT } from '../constants/ActionTypes';

export function finishedQuestion(roomID, personList) {
	return { type: FINISHED_QUESTION };
}

export function updateVotes(answerList) {
	return { type: UPDATE_VOTES, response: answerList};
}

export function showResult(finalAnswer) {
	return { type: SHOW_RESULT, response: finalAnswer};
}