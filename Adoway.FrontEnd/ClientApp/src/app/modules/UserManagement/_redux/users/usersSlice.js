import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialUsersState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    userForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const usersSlice = createSlice({
    name: "users",
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
        // userSelected
        userSelected: (state, action) => {
            state.userForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findUsers
        usersFetched: (state, action) => {
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
        // createUser
        userCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.user);
        },
        // updateUser
        userUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.user.id) {
                    return action.payload.user;
                }
                return entity;
            });
        },
        // deleteUser
        userDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
