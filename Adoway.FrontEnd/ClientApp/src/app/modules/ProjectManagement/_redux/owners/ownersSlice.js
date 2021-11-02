import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialOwnerState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    allOwners:[],
    ownerForEdit: undefined,
    lastError: null,
    ownerInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const ownersSlice = createSlice({
    name: "owner",
    initialState: initialOwnerState,
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

        // ownerSelected
        ownerSelected: (state, action) => {
            state.ownerForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findOwner
        ownerFetched: (state, action) => {
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
        // createOwner
        ownerCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.owner);
        },
        // updateOwner
        ownerUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.owner.id) {
                    return action.payload.owner;
                }
                return entity;
            });
        },
        allOwnersFetched: (state, action) => {
            const owners = action.payload;
            state.allOwners = owners;
        },
        // deleteOwner
        ownerDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
