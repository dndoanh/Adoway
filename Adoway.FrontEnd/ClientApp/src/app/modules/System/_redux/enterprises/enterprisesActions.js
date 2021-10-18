import * as requestFromServer from "./enterprisesCrud";
import {enterprisesSlice, callTypes} from "./enterprisesSlice";

const {actions} = enterprisesSlice;

export const fetchAllEnterprises = dispatch => {
    return requestFromServer
        .getAllEnterprises()
        .then(response => {
            const enterprises = response.data;
            dispatch(actions.allEnterprisesFetched(enterprises));
        })
        .catch(error => {
            error.clientMessage = "Can't find enterprise";
        });
};

export const fetchEnterprises = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEnterprises(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.enterprisesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find enterprises";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectEnterprise = id => dispatch => {
    dispatch(actions.enterpriseSelected({ id: id }));
};

export const createEnterprise = enterpriseForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEnterprise(enterpriseForCreation)
    .then(response => {
      const enterprise = response.data;
      dispatch(actions.enterpriseCreated({ enterprise }));
    })
    .catch(error => {
      error.clientMessage = "Can't create enterprise";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateEnterprise = enterprise => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEnterprise(enterprise)
    .then(() => {
        dispatch(actions.enterpriseUpdated({ enterprise }));
    })
    .catch(error => {
      error.clientMessage = "Can't update enterprise";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteEnterprise = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteEnterprise(id)
        .then(response => {
            dispatch(actions.enterpriseDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete enterprise";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};