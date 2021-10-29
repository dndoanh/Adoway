import * as requestFromServer from "./departmentsCrud";
import {departmentsSlice, callTypes} from "./departmentsSlice";

const {actions} = departmentsSlice;

export const fetchDepartments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDepartments(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.departmentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find departments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectDepartment = id => dispatch => {
    dispatch(actions.departmentSelected({ id: id }));
};

export const createDepartment = departmentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDepartment(departmentForCreation)
    .then(response => {
      const department = response.data;
      dispatch(actions.departmentCreated({ department }));
    })
    .catch(error => {
      error.clientMessage = "Can't create department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDepartment = department => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDepartment(department)
    .then(() => {
        dispatch(actions.departmentUpdated({ department }));
    })
    .catch(error => {
      error.clientMessage = "Can't update department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDepartment = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteDepartment(id)
        .then(response => {
            dispatch(actions.departmentDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete department";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};