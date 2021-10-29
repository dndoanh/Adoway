import * as requestFromServer from "./projectsCrud";
import {projectsSlice, callTypes} from "./projectsSlice";

const {actions} = projectsSlice;

export const fetchProjects = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProjects(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.projectsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectProject = id => dispatch => {
    dispatch(actions.projectSelected({ id: id }));
};

export const createProject = projectForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProject(projectForCreation)
    .then(response => {
      const project = response.data;
      dispatch(actions.projectCreated({ project }));
    })
    .catch(error => {
      error.clientMessage = "Can't create project";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProject = project => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProject(project)
    .then(() => {
        dispatch(actions.projectUpdated({ project }));
    })
    .catch(error => {
      error.clientMessage = "Can't update project";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProject = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteProject(id)
        .then(response => {
            dispatch(actions.projectDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete project";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};