import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialTeleVendorsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    teleVendorForEdit: undefined,
    lastError: null,
    teleVendorInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const teleVendorsSlice = createSlice({
    name: "teleVendors",
    initialState: initialTeleVendorsState,
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

        // teleVendorSelected
        teleVendorSelected: (state, action) => {
            state.teleVendorForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findTeleVendors
        teleVendorsFetched: (state, action) => {
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
        // createTeleVendor
        teleVendorCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.teleVendor);
        },
        // updateTeleVendor
        teleVendorUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.teleVendor.id) {
                    return action.payload.teleVendor;
                }
                return entity;
            });
        },
        // deleteTeleVendor
        teleVendorDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
