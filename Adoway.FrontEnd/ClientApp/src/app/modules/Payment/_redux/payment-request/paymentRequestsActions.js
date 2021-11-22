import * as requestFromServer from "./paymentRequestsCrud";
import {paymentRequestsSlice, callTypes} from "./paymentRequestsSlice";

const {actions} = paymentRequestsSlice;

export const fetchAllPaymentRequests = dispatch => {
    return requestFromServer
        .getAllPaymentRequests()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allPaymentRequestsFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const fetchPaymentRequests = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPaymentRequests(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.paymentRequestsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find paymentRequests";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectPaymentRequest = id => dispatch => {
    dispatch(actions.paymentRequestSelected({ id: id }));
};

export const createPaymentRequest = paymentRequestForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPaymentRequest(paymentRequestForCreation)
    .then(response => {
      const paymentRequest = response.data;
      dispatch(actions.paymentRequestCreated({ paymentRequest }));
    })
    .catch(error => {
      error.clientMessage = "Can't create paymentRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePaymentRequest = paymentRequest => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePaymentRequest(paymentRequest)
    .then(() => {
        dispatch(actions.paymentRequestUpdated({ paymentRequest }));
    })
    .catch(error => {
      error.clientMessage = "Can't update paymentRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePaymentRequest = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deletePaymentRequest(id)
        .then(response => {
            dispatch(actions.paymentRequestDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete paymentRequest";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};