import AuthApi from '../api/AuthApi';
import * as types from './actionTypes.js';

export function loadCurrentUser(access_token) {
    return function(dispatch) {
        return AuthApi.getCurrentUser(access_token).then(user => {
            dispatch(loadCurrentUserSuccess(user));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadCurrentUserSuccess(user) {
    return {type: types.LOAD_CURRENT_USER_SUCCESS, user};
}