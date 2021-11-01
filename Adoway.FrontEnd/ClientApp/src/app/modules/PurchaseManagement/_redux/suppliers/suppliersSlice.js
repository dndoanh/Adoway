import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialSupplierState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    supplierForEdit: undefined,
    lastError: null,
    supplierInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const suppliersSlice = createSlice({
    name: "supplier",
    initialState: initialSupplierState,
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

        // supplierSelected
        supplierSelected: (state, action) => {
            state.supplierForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findSupplier
        supplierFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            state.entities = state.entities;
            
        },
        // createSupplier
        supplierCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.supplier);
        },
        // updateSupplier
        supplierUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.supplier.id) {
                    return action.payload.supplier;
                }
                return entity;
            });
        },
        // deleteSupplier
        supplierDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
