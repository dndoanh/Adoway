/*/*import * as requestFromServer from "./workOrdersCrud";*/
import { eventsSlice, callTypes} from "./eventsSlice";
import * as requestFromServer from "./eventsCrud";
const {actions} = eventsSlice;


export const selectEvent = id => dispatch => {
    dispatch(actions.eventSelected({ id: id }));
};

//export const createEvent = eventForCreation => dispatch => {
//    dispatch(actions.eventCreated({ eventForCreation }));
//};
export const fetchEvents = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findEvents(queryParams)
        .then(response => {
            const { totalCount, entities } = response.data;
            dispatch(actions.eventsFetched({ totalCount, entities }));
        })
        .catch(error => {
            error.clientMessage = "Can't find payments";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};
export const createEvent = eventForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createEvent(eventForCreation)
        .then(response => {
            const event = response.data;
            dispatch(actions.eventCreated({ event }));
        })
        .catch(error => {
            error.clientMessage = "Can't create event";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
//export const updateEvent = event => dispatch => {
//    dispatch(actions.eventUpdated({ event }));
//};
export const updateEvent = event => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateEvent(event)
        .then(() => {
            dispatch(actions.eventUpdated({ event }));
        })
        .catch(error => {
            error.clientMessage = "Can't update event";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
//export const deleteEvent = id => dispatch => {
//    dispatch(actions.eventDeleted({ id: id }));
//};
export const deleteEvent = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteEvent(id)
        .then(response => {
            dispatch(actions.eventDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete workOrder";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};