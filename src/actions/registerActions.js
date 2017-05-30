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

export function updateUser(
    access_token,
    id,
    username,
    password,
    firstname,
    lastname,
    email,
    address,
    borndate,
    company) {
    return function(dispatch) {
        return AuthApi.updateUser(
            access_token,
            id,
            username,
            password,
            firstname,
            lastname,
            email,
            address,
            borndate,
            company).then(user => {
            dispatch(saveUserSuccess(user));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveUserSuccess(user) {
    return {type: types.LOAD_CURRENT_USER_SUCCESS, user};
}