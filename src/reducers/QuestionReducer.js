import Immutable from 'immutable';
import { START_VOTE, FINISHED_QUESTION, UPDATE_VOTES, SHOW_RESULT } from '../constants/ActionTypes.js';

const initialState = Immutable.fromJS({
	optionArray: [],
	currQuestion: '',
	answers: [],
	currAnswers: [],
	done: false,
	qnumber: 0,
	result: {}
})


export default function QuestionStore(state = initialState, action) {

	let newState = state;
	let index = -1;

	switch (action.type) {
		
		case START_VOTE: 
			newState = state.set('currQuestion', Immutable.fromJS(action.response.question))
							.set('answers', Immutable.fromJS(action.response.answers))
			 				.set('qnumber', state.get('qnumber') + 1);
			newState = newState.set('currAnswers', Immutable.fromJS(newState.get('answers').map((answer)=> 0)));
			return newState;

		case FINISHED_QUESTION:
			newState = state.set('done', true);
			return newState;

		case UPDATE_VOTES:
			 console.log(newState.get('currAnswers'));
			 action.response.map((answer) => {
			 	newState = newState.update('currAnswers', (answerList, i) => {
			 		let found = false;
			 		if (state.get('qnumber') < 5) {
			 			state.get('answers').map((answerObj, i) => {
			 				if (answerObj === answer) {
			 					found = true;
			 					index = i;
			 				}
			 			});
			 			console.log(index);
			 		}
			 		if (found) {
			 			console.log('in here')
			 			console.log(answerList.set(index, answerList.get(index) + 1).toJS())
			 			return answerList.set(index, answerList.get(index) + 1);
			 		}
			 		return answerList;
			 	})
			 });
			return newState;

		case SHOW_RESULT:
			newState = state.set('result', Immutable.fromJS(action.response));
			return newState;
		
		default:
			return state;
	}
}