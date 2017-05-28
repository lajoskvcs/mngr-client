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

export function loadTasks(access_token, projectId) {
    return function(dispatch) {
        return projectApi.getAllTasks(access_token, projectId).then(tasks => {
            dispatch(loadTasksSuccess(tasks));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTasksSuccess(tasks) {
    return {type: types.LOAD_TASKS_SUCCESS, tasks};
}

export function loadProject(access_token, id) {
    return function(dispatch) {
        return projectApi.getProject(access_token, id).then(project => {
            dispatch(loadProjectSuccess(project));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadNotes(access_token, projectId) {
    return function(dispatch) {
        return projectApi.getNotes(access_token, projectId).then(notes => {
            dispatch(loadNotesSuccess(notes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function patchNote(access_token, noteId, note) {
    return function(dispatch) {
        return projectApi.patchNote(access_token, noteId, note).then(notes => {
            dispatch(loadNotesSuccess(notes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function unloadProject() {
    return function(dispatch) {
        dispatch({type: types.UNLOAD_PROJECT});
    };
}

export function loadNotesSuccess(notes) {
    return {type: types.LOAD_NOTES_SUCCESS, notes};
}

export function loadProjectSuccess(project) {
    return {type: types.LOAD_PROJECT_SUCCESS, project};
}

export function selectProject(id, projects) {
    return function(dispatch) {
        dispatch(selectProjectSuccess(id, projects));
    };
}

export function selectProjectSuccess(id, projects) {
    return {type: types.SELECT_PROJECT_SUCCESS, id, projects};
}