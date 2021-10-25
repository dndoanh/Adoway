import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialRolesState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    roleForEdit: undefined,
    lastError: null,
    roleInScreens:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const roleInScreensSlice = createSlice({
    name: "roleInScreens",
    initialState: initialRolesState,
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
        roleInScreensCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.roleInScreens);
        },
        // roleSelected
        roleSelected: (state, action) => {
            state.roleForEdit = _.find(state.entities, { id: action.payload.id });
        },
        roleInScreensFetched: (state, action) => {
            const roles = action.payload;
            state.roleInScreens = roles;
        },
        roleInScreensUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.roleInScreens = state.entities.map(entity => {
                if (entity.id === action.payload.roleInScreens.id) {
                    return action.payload.roleInScreens;
                }
                return entity;
            });
        },
        roleInScreensStatusUpdated: (state, action) => {
            state.roleInScreens = state.roleInScreens.map(entity => {
                return {
                    ...entity,
                    screenFunctions: entity.screenFunctions.map(sf => {
                        if (sf.id === action.payload.id) {
                            return { ...sf, belongTo: !sf.belongTo }
                        }
                        return sf;
                    })
                }
               
            });
        },
    }
});
