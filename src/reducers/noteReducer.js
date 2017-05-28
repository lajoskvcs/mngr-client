import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function projectReducer(state = initialState.note, action) {
    switch(action.type) {
        case types.LOAD_NOTES_SUCCESS:
            return action.notes;
        case types.UNLOAD_PROJECT:
            return null;
        case types.DROP_STORE:
            return null;
        default:
            return state;
    }
}