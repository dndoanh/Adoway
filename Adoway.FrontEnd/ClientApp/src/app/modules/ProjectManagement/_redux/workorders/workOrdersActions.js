import * as requestFromServer from "./workOrdersCrud";
import {workOrdersSlice, callTypes} from "./workOrdersSlice";

const {actions} = workOrdersSlice;

export const fetchWorkOrders = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findWorkOrders(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.workOrdersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find workOrders";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchWorkOrder = id => dispatch => {
    if (!id) {
        return dispatch(actions.workOrderFetched({ workOrderForEdit: undefined }));
    }

    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getWorkOrderById(id)
        .then(response => {
            const workorder = response.data;
            dispatch(actions.workOrderFetched({ workOrderForEdit: workorder }));
        })
        .catch(error => {
            error.clientMessage = "Can't find product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const selectWorkOrder = id => dispatch => {
    dispatch(actions.workOrderSelected({ id: id }));
};

export const createWorkOrder = workOrderForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createWorkOrder(workOrderForCreation)
    .then(response => {
      const workOrder = response.data;
      dispatch(actions.workOrderCreated({ workOrder }));
    })
    .catch(error => {
      error.clientMessage = "Can't create workOrder";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateWorkOrder = workOrder => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateWorkOrder(workOrder)
    .then(() => {
        dispatch(actions.workOrderUpdated({ workOrder }));
    })
    .catch(error => {
      error.clientMessage = "Can't update workOrder";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteWorkOrder = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteWorkOrder(id)
        .then(response => {
            dispatch(actions.workOrderDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateStatusPassed = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusPassed(id)
        .then(() => {
            dispatch(actions.updateStatusPassed({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't update workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateStatusInprogress = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusInprogress(id)
        .then(() => {
            dispatch(actions.updateStatusInprogress ({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't update workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateStatusReturn = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusReturn(id)
        .then(() => {
            dispatch(actions.updateStatusReturn({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't update workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateStatusFinished = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusFinish(id)
        .then(() => {
            dispatch(actions.updateStatusFinish({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't update workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateStatusPending= id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusPending(id)
        .then(() => {
            dispatch(actions.updateStatusPending =({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't update workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};