import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';
const now = new Date()
const initialEventsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: [],
    eventForEdit: undefined,
    lastError: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const eventsSlice = createSlice({
    name: "events",
    initialState: initialEventsState,
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

        // eventSelected
        eventSelected: (state, action) => {
            state.eventForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findEvents
        eventsFetched: (state, action) => {
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
        // createEvent
        eventCreated: (state, action) => {
            debugger;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
       /*     action.payload.eventForCreation.allDay = false;*/
            state.entities.push(action.payload.event);
        },
        // updateEvent
        eventUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.event.id) {
                    return action.payload.event;
                }
                return entity;
            });
        },
        eventFetched: (state, action) => {
            state.actionsLoading = false;
            state.eventForEdit = action.payload.eventForEdit;
            state.error = null;
        },
        // deleteEvent
        eventDeleted: (state, action) => {
            debugger;
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
