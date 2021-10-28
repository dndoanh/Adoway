import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialContractsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    contractForEdit: undefined,
    lastError: null,
    contractInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const contractsSlice = createSlice({
    name: "contracts",
    initialState: initialContractsState,
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

        // contractSelected
        contractSelected: (state, action) => {
            state.contractForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findContracts
        contractsFetched: (state, action) => {
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
        // createContract
        contractCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.contract);
        },
        // updateContract
        contractUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.contract.id) {
                    return action.payload.contract;
                }
                return entity;
            });
        },
        // deleteContract
        contractDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
