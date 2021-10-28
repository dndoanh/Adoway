import * as requestFromServer from "./ownersCrud";
import {ownersSlice, callTypes} from "./ownersSlice";

const {actions} = ownersSlice;

export const fetchOwners = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOwner(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ownerFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find owner";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectOwner = id => dispatch => {
    dispatch(actions.ownerSelected({ id: id }));
};

export const createOwner = ownerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createOwner(ownerForCreation)
    .then(response => {
      const owner = response.data;
      dispatch(actions.ownerCreated({ owner }));
    })
    .catch(error => {
      error.clientMessage = "Can't create owner";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOwners = owner => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOwner(owner)
    .then(() => {
        dispatch(actions.ownerUpdated({ owner }));
    })
    .catch(error => {
      error.clientMessage = "Can't update owner";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteOwners = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteOwner(id)
        .then(response => {
            dispatch(actions.ownerDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete owner";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};