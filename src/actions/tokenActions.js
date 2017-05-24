import AuthApi from '../api/AuthApi';
import * as types from './actionTypes.js';

export function loadTokens(username, password) {
    return function(dispatch) {
        return AuthApi.getTokens(username, password).then(tokens => {
            dispatch(loadTokensSuccess(tokens));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTokensSuccess(tokens) {
    return {type: types.LOAD_TOKENS_SUCCESS, tokens};
}