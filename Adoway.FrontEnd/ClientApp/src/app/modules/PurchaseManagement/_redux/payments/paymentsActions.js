import * as requestFromServer from "./paymentsCrud";
import {paymentsSlice, callTypes} from "./paymentsSlice";

const {actions} = paymentsSlice;

export const fetchAllPayments = dispatch => {
    return requestFromServer
        .getAllPayments()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allPaymentsFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const fetchPayments = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPayments(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.paymentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find payments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectPayment = id => dispatch => {
    dispatch(actions.paymentSelected({ id: id }));
};

export const createPayment = paymentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPayment(paymentForCreation)
    .then(response => {
      const payment = response.data;
      dispatch(actions.paymentCreated({ payment }));
    })
    .catch(error => {
      error.clientMessage = "Can't create payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePayment = payment => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePayment(payment)
    .then(() => {
        dispatch(actions.paymentUpdated({ payment }));
    })
    .catch(error => {
      error.clientMessage = "Can't update payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayment = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deletePayment(id)
        .then(response => {
            dispatch(actions.paymentDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete payment";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};