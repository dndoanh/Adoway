import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialPaymentRequestsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    paymentRequestForEdit: undefined,
    lastError: null,
    paymentRequests:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const paymentRequestsSlice = createSlice({
    name: "paymentRequests",
    initialState: initialPaymentRequestsState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },

        // paymentRequestSelected
        paymentRequestSelected: (state, action) => {
            state.paymentRequestForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findPaymentRequests
        paymentRequestsFetched: (state, action) => {
            const { totalCount, entities} = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            
        },
        // createPaymentRequest
        paymentRequestCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.paymentRequest);
        },
        // updatePaymentRequest
        paymentRequestUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.paymentRequests.map(entity => {
                if (entity.id === action.payload.paymentRequest.id) {
                    return action.payload.paymentRequest;
                }
                return entity;
            });
        },
        allPaymentRequestsFetched: (state, action) => {
            const paymentRequests = action.payload;
            state.allPaymentRequests = paymentRequests;
        },
        // deletePaymentRequest
        paymentRequestDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.paymentRequests.filter(el => el.id !== action.payload.id);
        },
    }
});
