import AuthApi from '../api/AuthApi';
import * as types from './actionTypes.js';

export function registerUser(username,
        password,
        firstname,
        lastname,
        email,
        address,
        borndate,
        company) {
    return function(dispatch) {
        return AuthApi.registerUser(username,
        password,
        firstname,
        lastname,
        email,
        address,
        borndate,
        company).then(user => {
            dispatch(registerUserSuccess(user));
        }).catch(error => {
            throw(error);
        });
    };
}

export function registerUserSuccess(user) {
    return {type: types.REGISTER_NEW_USER, user};
}