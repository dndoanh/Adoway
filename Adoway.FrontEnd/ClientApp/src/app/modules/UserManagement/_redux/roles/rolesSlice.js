import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialRoleState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    roleForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const rolesSlice = createSlice({
    name: "roles",
    initialState: initialRoleState,
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
        // roleSelected
        roleSelected: (state, action) => {
            state.roleForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findRole
        rolesFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
        // createRoles
        roleCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            state.entities.push(action.payload.role);
        },
        // updateRoles
        roleUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.role.id) {
                    return action.payload.role;
                }
                return entity;
            });
        },
        // deleteRoles
        roleDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
