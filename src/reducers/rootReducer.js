import {combineReducers} from 'redux';
import projects from './projectReducer';
import currentUser from './currentUserReducer';
import dashboard from './dashboardReducer';
import tokens from './tokenReducer';
import selectedProject from './selectedProjectReducer';

const rootReducer = combineReducers({
    tokens,
    currentUser,
    projects,
    dashboard,
    selectedProject
});

export default rootReducer;