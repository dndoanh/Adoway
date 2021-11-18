import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/event`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findEvents(queryParams) {
    return axios.post(`${USERS_URL}/searchEvents`, queryParams);
}
export function getEventById(eventId) {
    return axios.get(`${USERS_URL}/${eventId}`);
}

// CREATE =>  POST: add a new event to the server
export function createEvent(event) {
    return axios.post(`${USERS_URL}/createEvent`, event);
}

// UPDATE => PUT: update the event on the server
export function updateEvent(event) {
    return axios.post(`${USERS_URL}/updateEvent`, event);
}

// DELETE => delete the event from the server
export function deleteEvent(eventId) {
    return axios.post(`${USERS_URL}/deleteEvent?id=${eventId}`);
}

export function getEventInRoles(eventId) {
    return axios.get(`${USERS_URL}/getEventInRoles?id=${eventId}`);
}

export function createEventInRoles(eventInRoles) {
    return axios.post(`${USERS_URL}/createEventInRole`, eventInRoles);
}

export function deleteEventInRoles(id) {
    return axios.post(`${USERS_URL}/deleteEventInRole?id=${id}`);
}