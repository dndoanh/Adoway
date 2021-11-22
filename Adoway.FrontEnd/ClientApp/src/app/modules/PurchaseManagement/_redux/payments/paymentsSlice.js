import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialPaymentsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    paymentForEdit: undefined,
    lastError: null,
    payments:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const paymentsSlice = createSlice({
    name: "payments",
    initialState: initialPaymentsState,
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

        // paymentSelected
        paymentSelected: (state, action) => {
            state.paymentForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findPayments
        paymentsFetched: (state, action) => {
            const { totalCount, entities} = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            
        },
        // createPayment
        paymentCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.payment);
        },
        // updatePayment
        paymentUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.payments.map(entity => {
                if (entity.id === action.payload.payment.id) {
                    return action.payload.payment;
                }
                return entity;
            });
        },
        allPaymentsFetched: (state, action) => {
            const payments = action.payload;
            state.allPayments = payments;
        },
        // deletePayment
        paymentDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.payments.filter(el => el.id !== action.payload.id);
        },
    }
});
