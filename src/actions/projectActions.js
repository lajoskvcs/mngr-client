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

export function addProject(access_token, project) {
    return function(dispatch) {
        let token = access_token;
        return projectApi.addProject(access_token, project).then(project => {
            projectApi.getAllProjects(token).then(projects => {
                dispatch(loadProjectsSuccess(projects));
            })
        }).catch(error => {
            throw(error);
        });
    };
}

export function addTask(access_token, projectId, task) {
    return function(dispatch) {
        let token = access_token;
        let project_id = projectId;
        return projectApi.addTask(access_token, task).then(task => {
            loadTasks(access_token, project_id);
        }).catch(error => {
            throw(error);
        });
    };
}

export function addProjectSuccess(project) {
    return {type: types.ADD_PROJECT_SUCCESS, project};
}

export function updateProject(access_token, project) {
    return function(dispatch) {
        return projectApi.updateProject(access_token, project).then(project => {
            dispatch(loadProjectSuccess(project));
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteProject(access_token, id) {
    return function(dispatch) {
        let token = access_token;
        return projectApi.deleteProject(access_token, id).then(project => {
            loadProjects(token);
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteMaterial(access_token, taskId, id) {
    return function(dispatch) {
        let token = access_token;
        let task_id = taskId;
        return projectApi.deleteMaterial(access_token, id).then(material => {
            loadTask(token, task_id);
        }).catch(error => {
            throw(error);
        });
    };
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

export function deleteTask(access_token, taskId) {
    return function(dispatch) {
        return projectApi.deleteTask(access_token, taskId).then(task => {

        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTasksSuccess(tasks) {
    return {type: types.LOAD_TASKS_SUCCESS, tasks};
}

export function loadTask(access_token, taskId) {
    return function(dispatch) {
        return projectApi.getTask(access_token, taskId).then(task => {
            dispatch(loadTaskSuccess(task));
        }).catch(error => {
            throw(error);
        });
    };
}
export function updateTask(access_token, task) {
    return function(dispatch) {
        return projectApi.updateTask(access_token, task).then(task => {
            dispatch(loadTaskSuccess(task));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTaskSuccess(task) {
    return {type: types.LOAD_TASK_SUCCESS, task};
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

export function patchNote(access_token, projectId,  noteId, note) {
    return function(dispatch) {
        return projectApi.patchNote(access_token, projectId, noteId, note).then(notes => {
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