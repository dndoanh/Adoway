import * as requestFromServer from "./apartmentsCrud";
import {apartmentsSlice, callTypes} from "./apartmentsSlice";

const {actions} = apartmentsSlice;

export const fetchApartments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findApartments(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.apartmentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find apartments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectApartment = id => dispatch => {
    dispatch(actions.apartmentSelected({ id: id }));
};

export const createApartment = apartmentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createApartment(apartmentForCreation)
    .then(response => {
      const apartment = response.data;
      dispatch(actions.apartmentCreated({ apartment }));
    })
    .catch(error => {
      error.clientMessage = "Can't create apartment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateApartment = apartment => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateApartment(apartment)
    .then(() => {
        dispatch(actions.apartmentUpdated({ apartment }));
    })
    .catch(error => {
      error.clientMessage = "Can't update apartment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteApartment = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteApartment(id)
        .then(response => {
            dispatch(actions.apartmentDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete apartment";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};