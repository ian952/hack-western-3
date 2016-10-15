import Immutable from 'immutable';
import * as pages from '../constants/PageTypes';
import { JOIN_ROOM, START_VOTE, GET_RESULTS } from '../constants/ActionTypes';
const initialState = Immutable.fromJS({
	currPage: pages.HOME,
	roomID: 0
});

export default function UserStore(state = initialState, action) {
	let newState = state;
	
	switch (action.type) {

	case JOIN_ROOM:
		newState = state.set('currPage', pages.ROOM);
		newState = newState.set('roomID', action.response);
		return newState;

	case START_VOTE: 
		newState = state.set('currPage', pages.VOTE);
		return newState;

	case GET_RESULTS:
		newState = state.set('currPage', pages.RESULTS);
		return newState;

	default: 
		return state;
	}
}

