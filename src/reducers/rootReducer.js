import {combineReducers} from 'redux';
import projects from './projectReducer';
import currentUser from './currentUserReducer';
import dashboard from './dashboardReducer';
import tokens from './tokenReducer';
import selectedProject from './selectedProjectReducer';
import note from './noteReducer';
import tasks from './tasksReducer';

const rootReducer = combineReducers({
    tokens,
    currentUser,
    projects,
    dashboard,
    selectedProject,
    note,
    tasks
});

export default rootReducer;