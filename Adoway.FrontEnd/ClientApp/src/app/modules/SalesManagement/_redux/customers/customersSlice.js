import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialCustomersState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    allOwners: [],
    customerForEdit: undefined,
    lastError: null,
    customerInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const customersSlice = createSlice({
    name: "customers",
    initialState: initialCustomersState,
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

        // customerSelected
        customerSelected: (state, action) => {
            state.customerForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findCustomers
        customersFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            state.entities = state.entities.map(entity => {
                entity.dob = entity.dob && new Date(entity.dob) || null;
                return entity;
            });
            
        },
        // createCustomer
        customerCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.customer);
        },
        // updateCustomer
        customerUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.customer.id) {
                    return action.payload.customer;
                }
                return entity;
            });
        },
        allCustomersFetched: (state, action) => {
            const customers = action.payload;
            state.allCustomers = customers;
        },
        // deleteCustomer
        customerDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
