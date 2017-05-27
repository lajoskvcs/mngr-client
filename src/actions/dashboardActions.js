import dashboardApi from '../api/dashboardApi';
import * as types from './actionTypes.js';

export function loadDashboard(access_token) {
  return function(dispatch) {
    return dashboardApi.getDashboard(access_token).then(dashboard => {
      dispatch(loadDashboardSuccess(dashboard));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadDashboardSuccess(dashboard) {
  return {type: types.LOAD_DASHBOARD_SUCCESS, dashboard};
}