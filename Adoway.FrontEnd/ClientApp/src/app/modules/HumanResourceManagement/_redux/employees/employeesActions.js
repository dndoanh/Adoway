import * as requestFromServer from "./employeesCrud";
import {employeesSlice, callTypes} from "./employeesSlice";

const {actions} = employeesSlice;

export const fetchEmployees = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployees(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.employeesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find employees";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectEmployee = id => dispatch => {
    dispatch(actions.employeeSelected({ id: id }));
};

export const createEmployee = employeeForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployee(employeeForCreation)
    .then(response => {
      const employee = response.data;
      dispatch(actions.employeeCreated({ employee }));
    })
    .catch(error => {
      error.clientMessage = "Can't create employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEmployee = employee => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployee(employee)
    .then(() => {
        dispatch(actions.employeeUpdated({ employee }));
    })
    .catch(error => {
      error.clientMessage = "Can't update employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEmployee = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteEmployee(id)
        .then(response => {
            dispatch(actions.employeeDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete employee";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};