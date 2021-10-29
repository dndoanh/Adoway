import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialDepartmentsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    departmentForEdit: undefined,
    lastError: null,
    departmentInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const departmentsSlice = createSlice({
    name: "departments",
    initialState: initialDepartmentsState,
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

        // departmentSelected
        departmentSelected: (state, action) => {
            state.departmentForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findDepartments
        departmentsFetched: (state, action) => {
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
        // createDepartment
        departmentCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.department);
        },
        // updateDepartment
        departmentUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.department.id) {
                    return action.payload.department;
                }
                return entity;
            });
        },
        // deleteDepartment
        departmentDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
