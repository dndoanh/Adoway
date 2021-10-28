import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialApartmentsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    apartmentForEdit: undefined,
    lastError: null,
    apartmentInRoles:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const apartmentsSlice = createSlice({
    name: "apartments",
    initialState: initialApartmentsState,
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

        // apartmentSelected
        apartmentSelected: (state, action) => {
            state.apartmentForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findApartments
        apartmentsFetched: (state, action) => {
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
        // createApartment
        apartmentCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.apartment);
        },
        // updateApartment
        apartmentUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.apartment.id) {
                    return action.payload.apartment;
                }
                return entity;
            });
        },
        // deleteApartment
        apartmentDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
