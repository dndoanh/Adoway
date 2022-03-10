import * as requestFromServer from "./subscriptionsCrud";
import {subscriptionsSlice, callTypes} from "./subscriptionsSlice";

const {actions} = subscriptionsSlice;

export const fetchSubscriptions = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSubscriptions(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.subscriptionsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find subscriptions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectSubscription = id => dispatch => {
    dispatch(actions.subscriptionSelected({ id: id }));
};

export const createSubscription = subscriptionForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSubscription(subscriptionForCreation)
    .then(response => {
      const subscription = response.data;
      dispatch(actions.subscriptionCreated({ subscription }));
    })
    .catch(error => {
      error.clientMessage = "Can't create subscription";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSubscription = subscription => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSubscription(subscription)
    .then(() => {
        dispatch(actions.subscriptionUpdated({ subscription }));
    })
    .catch(error => {
      error.clientMessage = "Can't update subscription";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSubscription = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteSubscription(id)
        .then(response => {
            dispatch(actions.subscriptionDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete subscription";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const importSubscription = subscriptionForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .importSubscription(subscriptionForCreation)
        .then(response => {
            //const subscription = response.data;
            //dispatch(actions.subscriptionCreated({ subscription }));
        })
        .catch(error => {
            error.clientMessage = "Can't create subscription";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const exportSubscription = subscriptionForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .exportSubscription(subscriptionForCreation)
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'baocaodoisoat.xlsx'); 
            document.body.appendChild(link);
            link.click();
            debugger;
        })
        .catch(error => {
            debugger;
            error.clientMessage = "Can't create subscription";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};