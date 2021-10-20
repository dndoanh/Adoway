import * as requestFromServer from "./rolesCrud";
import {rolesSlice, callTypes} from "./rolesSlice";

const {actions} = rolesSlice;

export const fetchRoles = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRoles(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.rolesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectRole = id => dispatch => {
    dispatch(actions.roleSelected({ id: id }));
};

export const createRole = roleForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRole(roleForCreation)
    .then(response => {
      const role = response.data;
      dispatch(actions.roleCreated({ role }));
    })
    .catch(error => {
      error.clientMessage = "Can't create role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRole = role => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRole(role)
    .then(() => {
        dispatch(actions.roleUpdated({ role }));
    })
    .catch(error => {
      error.clientMessage = "Can't update role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRole = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteRole(id)
        .then(response => {
            dispatch(actions.roleDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete role";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};