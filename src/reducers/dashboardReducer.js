import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentUserReducer(state = initialState.dashboard, action) {
    switch(action.type) {
        case types.LOAD_DASHBOARD_SUCCESS:
            return action.dashboard;
        case types.DROP_STORE:
            return null;
        default:
            return state;
    }
}