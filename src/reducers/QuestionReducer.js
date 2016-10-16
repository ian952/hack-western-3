import Immutable from 'immutable';
import { START_VOTE } from '../constants/ActionTypes.js';

const initialState = Immutable.fromJS({
	optionArray: [],
	currQuestion: '',
	answers: [],
	currAnswers: [],
	done: false
})


export default function QuestionStore(state = initialState, action) {

	let newState = state;

	switch (action.type) {
		
		case START_VOTE: 
			newState = state.set('currQuestion', action.response.question);
			newState = newState.set('answers', action.response.answers);
			return newState;
		
		default:
			return state;
	}
}