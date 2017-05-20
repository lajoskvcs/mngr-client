import projectApi from '../api/projectApi';
import * as types from './actionTypes.js';

export function loadProjects() {
  return function(dispatch) {
    return projectApi.getAllProjects().then(projects => {
      dispatch(loadProjectsSuccess(projects));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadProjectsSuccess(cats) {
  return {type: types.LOAD_PROJECTS_SUCCESS, projects};
}