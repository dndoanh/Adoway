import * as requestFromServer from "./suppliersCrud";
import {suppliersSlice, callTypes} from "./suppliersSlice";

const {actions} = suppliersSlice;


export const fetchAllSuppliers = dispatch => {
    return requestFromServer
        .getAllSuppliers()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allSuppliersFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const fetchSuppliers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSupplier(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.supplierFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find supplier";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const selectSupplier = id => dispatch => {
    dispatch(actions.supplierSelected({ id: id }));
};

export const createSupplier = supplierForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSupplier(supplierForCreation)
    .then(response => {
      const supplier = response.data;
      dispatch(actions.supplierCreated({ supplier }));
    })
    .catch(error => {
      error.clientMessage = "Can't create supplier";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSupplier = supplier => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSupplier(supplier)
    .then(() => {
        dispatch(actions.supplierUpdated({ supplier }));
    })
    .catch(error => {
      error.clientMessage = "Can't update supplier";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSupplier = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteSupplier(id)
        .then(response => {
            dispatch(actions.supplierDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete supplier";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};