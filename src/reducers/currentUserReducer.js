import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentUserReducer(state = initialState.currentUser, action) {
    switch(action.type) {
        case types.LOAD_CURRENT_USER_SUCCESS:
            return action.user;
        default:
            return state;
    }
}