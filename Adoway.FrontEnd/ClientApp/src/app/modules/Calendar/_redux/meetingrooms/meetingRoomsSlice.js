import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialMeetingRoomsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
    allMeetingRooms:[],
    meetingRoomForEdit: undefined,
    lastError: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const meetingRoomsSlice = createSlice({
    name: "meetingRooms",
    initialState: initialMeetingRoomsState,
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

        // meetingRoomSelected
        meetingRoomSelected: (state, action) => {
            state.meetingRoomForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findMeetingRooms
        meetingRoomsFetched: (state, action) => {
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
        // createMeetingRoom
        meetingRoomCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.meetingRoom);
        },
        // updateMeetingRoom
        meetingRoomUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.meetingRoom.id) {
                    return action.payload.meetingRoom;
                }
                return entity;
            });
        },
        allMeetingRoomsFetched: (state, action) => {
            const meetingRooms = action.payload;
            state.allMeetingRooms = meetingRooms;
        },
        // deleteMeetingRoom
        meetingRoomDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
