import * as requestFromServer from "./languagesCrud";
import {languagesSlice, callTypes} from "./languagesSlice";

const {actions} = languagesSlice;

export const fetchAllLanguages = dispatch => {
    return requestFromServer
        .getAllLanguages()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allLanguagesFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find language";
        });
};

export const fetchLanguages = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLanguages(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.languagesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find languages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectLanguage = id => dispatch => {
    dispatch(actions.languageSelected({ id: id }));
};

export const fetchLanguage = id => dispatch => {
  if (!id) {
    return dispatch(actions.languageFetched({ languageForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLanguageById(id)
    .then(response => {
      const language = response.data;
      dispatch(actions.languageFetched({ languageForEdit: language }));
    })
    .catch(error => {
      error.clientMessage = "Can't find language";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteLanguage = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLanguage(id)
    .then(response => {
      dispatch(actions.languageDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete language";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createLanguage = languageForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLanguage(languageForCreation)
    .then(response => {
      const language = response.data;
      dispatch(actions.languageCreated({ language }));
    })
    .catch(error => {
      error.clientMessage = "Can't create language";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateLanguage = language => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLanguage(language)
    .then(() => {
      dispatch(actions.languageUpdated({ language }));
    })
    .catch(error => {
      error.clientMessage = "Can't update language";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
