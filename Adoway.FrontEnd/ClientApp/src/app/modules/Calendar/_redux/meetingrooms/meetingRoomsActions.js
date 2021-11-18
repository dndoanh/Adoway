import * as requestFromServer from "./meetingRoomsCrud";
import {meetingRoomsSlice, callTypes} from "./meetingRoomsSlice";

const {actions} = meetingRoomsSlice;

export const fetchMeetingRooms = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMeetingRooms(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.meetingRoomsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find meetingRooms";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAllMeetingRooms = dispatch => {
    return requestFromServer
        .getAllMeetingRooms()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allMeetingRoomsFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const selectMeetingRoom = id => dispatch => {
    dispatch(actions.meetingRoomSelected({ id: id }));
};

export const createMeetingRoom = meetingRoomForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMeetingRoom(meetingRoomForCreation)
    .then(response => {
      const meetingRoom = response.data;
      dispatch(actions.meetingRoomCreated({ meetingRoom }));
    })
    .catch(error => {
      error.clientMessage = "Can't create meetingRoom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMeetingRoom = meetingRoom => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMeetingRoom(meetingRoom)
    .then(() => {
        dispatch(actions.meetingRoomUpdated({ meetingRoom }));
    })
    .catch(error => {
      error.clientMessage = "Can't update meetingRoom";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeetingRoom = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteMeetingRoom(id)
        .then(response => {
            dispatch(actions.meetingRoomDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete meetingRoom";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};