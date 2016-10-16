
const initialState = {
	optionArray: [],
	currQuestion: '',
	answers: [],
	currAnswers: [],
	done: false
}


export default function QuestionStore(state = initialState, action) {

	let newState = state;

	switch (action.type) {
		
		case START_VOTE: 
			newState = state.set('currQuestion', action.response.question);
			newState = newState.set('done', action.response.answers);
			return newState;
		
		default:
			return state;
	}
}