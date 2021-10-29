import * as requestFromServer from "./teleVendorsCrud";
import {teleVendorsSlice, callTypes} from "./teleVendorsSlice";

const {actions} = teleVendorsSlice;

export const fetchTeleVendors = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTeleVendors(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.teleVendorsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find teleVendors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectTeleVendor = id => dispatch => {
    dispatch(actions.teleVendorSelected({ id: id }));
};

export const createTeleVendor = teleVendorForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTeleVendor(teleVendorForCreation)
    .then(response => {
      const teleVendor = response.data;
      dispatch(actions.teleVendorCreated({ teleVendor }));
    })
    .catch(error => {
      error.clientMessage = "Can't create teleVendor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTeleVendor = teleVendor => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTeleVendor(teleVendor)
    .then(() => {
        dispatch(actions.teleVendorUpdated({ teleVendor }));
    })
    .catch(error => {
      error.clientMessage = "Can't update teleVendor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTeleVendor = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteTeleVendor(id)
        .then(response => {
            dispatch(actions.teleVendorDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete teleVendor";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};