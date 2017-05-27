import projectApi from '../api/projectApi';
import * as types from './actionTypes.js';

export function loadProjects(access_token) {
    return function(dispatch) {
        return projectApi.getAllProjects(access_token).then(projects => {
            dispatch(loadProjectsSuccess(projects));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadProjectsSuccess(projects) {
    return {type: types.LOAD_PROJECTS_SUCCESS, projects};
}

export function selectProject(id, projects) {
    return function(dispatch) {
        dispatch(selectProjectSuccess(id, projects));
    };
}

export function selectProjectSuccess(id, projects) {
    return {type: types.SELECT_PROJECT_SUCCESS, id, projects};
}