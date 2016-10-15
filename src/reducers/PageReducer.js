import Immutable from 'immutable';
import * as pages from '../constants/PageTypes';

const initialState = Immutable.fromJS({
	currPage: pages.HOME
});
