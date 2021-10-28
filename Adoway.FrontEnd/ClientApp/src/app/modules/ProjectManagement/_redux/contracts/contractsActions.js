import * as requestFromServer from "./contractsCrud";
import {contractsSlice, callTypes} from "./contractsSlice";

const {actions} = contractsSlice;

export const fetchContracts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findContracts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.contractsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find contracts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectContract = id => dispatch => {
    dispatch(actions.contractSelected({ id: id }));
};

export const createContract = contractForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createContract(contractForCreation)
    .then(response => {
      const contract = response.data;
      dispatch(actions.contractCreated({ contract }));
    })
    .catch(error => {
      error.clientMessage = "Can't create contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateContract = contract => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateContract(contract)
    .then(() => {
        dispatch(actions.contractUpdated({ contract }));
    })
    .catch(error => {
      error.clientMessage = "Can't update contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteContract = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteContract(id)
        .then(response => {
            dispatch(actions.contractDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete contract";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};