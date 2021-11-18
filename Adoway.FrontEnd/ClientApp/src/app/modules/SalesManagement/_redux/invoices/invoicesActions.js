import * as requestFromServer from "./invoicesCrud";
import {invoicesSlice, callTypes} from "./invoicesSlice";

const {actions} = invoicesSlice;

export const fetchAllInvoices = dispatch => {
    return requestFromServer
        .getAllInvoices()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allInvoicesFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const fetchInvoices = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findInvoices(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.invoicesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find invoices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectInvoice = id => dispatch => {
    dispatch(actions.invoiceSelected({ id: id }));
};

export const createInvoice = invoiceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createInvoice(invoiceForCreation)
    .then(response => {
      const invoice = response.data;
      dispatch(actions.invoiceCreated({ invoice }));
    })
    .catch(error => {
      error.clientMessage = "Can't create invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateInvoice = invoice => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateInvoice(invoice)
    .then(() => {
        dispatch(actions.invoiceUpdated({ invoice }));
    })
    .catch(error => {
      error.clientMessage = "Can't update invoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteInvoice = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteInvoice(id)
        .then(response => {
            dispatch(actions.invoiceDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete invoice";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};