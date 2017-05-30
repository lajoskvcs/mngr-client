import {combineReducers} from 'redux';
import projects from './projectReducer';
import currentUser from './currentUserReducer';
import dashboard from './dashboardReducer';
import tokens from './tokenReducer';
import selectedProject from './selectedProjectReducer';
import note from './noteReducer';
import tasks from './tasksReducer';
import task from './taskReducer';

const rootReducer = combineReducers({
    tokens,
    currentUser,
    projects,
    dashboard,
    selectedProject,
    note,
    tasks,
    task
});

export default rootReducer;