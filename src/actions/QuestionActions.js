import { FINISHED_QUESTION } from '../constants/ActionTypes';

export function finishedQuestion(roomID, personList) {
	return { type: FINISHED_QUESTION };
}