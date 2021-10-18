import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialEnterprisesState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    allEnterprises: [],
    enterpriseForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const enterprisesSlice = createSlice({
    name: "enterprises",
    initialState: initialEnterprisesState,
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
        // enterpriseSelected
        enterpriseSelected: (state, action) => {
            state.enterpriseForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findEnterprises
        enterprisesFetched: (state, action) => {
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
        // getEnterprises
        allEnterprisesFetched: (state, action) => {
            const enterprises = action.payload;
            state.allEnterprises = enterprises;
        },
        // createEnterprise
        enterpriseCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            state.entities.push(action.payload.enterprise);
        },
        // updateEnterprise
        enterpriseUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.enterprise.id) {
                    return action.payload.enterprise;
                }
                return entity;
            });
        },
        // deleteEnterprise
        enterpriseDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
