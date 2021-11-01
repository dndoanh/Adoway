import * as requestFromServer from "./customersCrud";
import {customersSlice, callTypes} from "./customersSlice";

const {actions} = customersSlice;

export const fetchCustomers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.customersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectCustomer = id => dispatch => {
    dispatch(actions.customerSelected({ id: id }));
};

export const createCustomer = customerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then(response => {
      const customer = response.data;
      dispatch(actions.customerCreated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = customer => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(customer)
    .then(() => {
        dispatch(actions.customerUpdated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't update customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteCustomer(id)
        .then(response => {
            dispatch(actions.customerDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete customer";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};