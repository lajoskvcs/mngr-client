import {combineReducers} from 'redux';
import projects from './projectReducer';
import currentUser from './currentUserReducer';
import tokens from './tokenReducer';

const rootReducer = combineReducers({
    tokens,
    currentUser,
    projects
});

export default rootReducer;