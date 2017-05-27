import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function selectedProjectReducer(state = initialState.selectedProject, action) {
    switch(action.type) {
        case types.SELECT_PROJECT_SUCCESS:
            let id = action.id;
            let selectedProject = null;
            action.projects.map(project => {
                if(project.id == id) {
                    selectedProject = project;
                }
            });
            return selectedProject;
        case types.DROP_STORE:
            return null;
        default:
            return state;
    }
}