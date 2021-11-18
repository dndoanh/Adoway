import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialInvoicesState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    invoiceForEdit: undefined,
    lastError: null,
    invoices:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: initialInvoicesState,
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

        // invoiceSelected
        invoiceSelected: (state, action) => {
            state.invoiceForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findInvoices
        invoicesFetched: (state, action) => {
            const { totalCount, entities} = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            
        },
        // createInvoice
        invoiceCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.invoice);
        },
        // updateInvoice
        invoiceUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.invoices.map(entity => {
                if (entity.id === action.payload.invoice.id) {
                    return action.payload.invoice;
                }
                return entity;
            });
        },
        allInvoicesFetched: (state, action) => {
            const invoices = action.payload;
            state.allInvoices = invoices;
        },
        // deleteInvoice
        invoiceDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.invoices.filter(el => el.id !== action.payload.id);
        },
    }
});
