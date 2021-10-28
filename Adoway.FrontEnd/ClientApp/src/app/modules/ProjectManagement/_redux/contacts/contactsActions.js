import * as requestFromServer from "./contactsCrud";
import {contactsSlice, callTypes} from "./contactsSlice";

const {actions} = contactsSlice;

export const fetchContacts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findContacts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.contactsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find contacts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectContact = id => dispatch => {
    dispatch(actions.contactSelected({ id: id }));
};

export const createContact = contactForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createContact(contactForCreation)
    .then(response => {
      const contact = response.data;
      dispatch(actions.contactCreated({ contact }));
    })
    .catch(error => {
      error.clientMessage = "Can't create contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateContact = contact => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateContact(contact)
    .then(() => {
        dispatch(actions.contactUpdated({ contact }));
    })
    .catch(error => {
      error.clientMessage = "Can't update contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteContact = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteContact(id)
        .then(response => {
            dispatch(actions.contactDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete contact";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};