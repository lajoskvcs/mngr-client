import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function taskReducer(state = initialState.task, action) {
    switch(action.type) {
        case types.LOAD_TASK_SUCCESS:
            return action.task;
        case types.UNLOAD_PROJECT:
            return null;
        case types.DROP_STORE:
            return null;
        default:
            return state;
    }
}