import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialUsersState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    userForEdit: undefined,
    lastError: null,
    userInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const userInRolesSlice = createSlice({
    name: "userInRoles",
    initialState: initialUsersState,
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
        userInRolesCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.userInRoles);
        },
        // userSelected
        userSelected: (state, action) => {
            state.userForEdit = _.find(state.entities, { id: action.payload.id });
        },
        userInRolesFetched: (state, action) => {
            debugger;
            const roles = action.payload;
            state.userInRoles = roles;
        },
   
    }
});
