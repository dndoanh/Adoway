import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/meetingRoom`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMeetingRooms(queryParams) {
    return axios.post(`${USERS_URL}/searchMeetingRooms`, queryParams);
}

export function getAllMeetingRooms() {
    return axios.get(USERS_URL + '/getMeetingRooms');
}


// CREATE =>  POST: add a new meetingRoom to the server
export function createMeetingRoom(meetingRoom) {
    return axios.post(`${USERS_URL}/createMeetingRoom`, meetingRoom);
}

// UPDATE => PUT: update the meetingRoom on the server
export function updateMeetingRoom(meetingRoom) {
    return axios.post(`${USERS_URL}/updateMeetingRoom`, meetingRoom);
}

// DELETE => delete the meetingRoom from the server
export function deleteMeetingRoom(meetingRoomId) {
    return axios.post(`${USERS_URL}/deleteMeetingRoom?id=${meetingRoomId}`);
}

export function getMeetingRoomInRoles(meetingRoomId) {
    return axios.get(`${USERS_URL}/getMeetingRoomInRoles?id=${meetingRoomId}`);
}

export function createMeetingRoomInRoles(meetingRoomInRoles) {
    return axios.post(`${USERS_URL}/createMeetingRoomInRole`, meetingRoomInRoles);
}

export function deleteMeetingRoomInRoles(id) {
    return axios.post(`${USERS_URL}/deleteMeetingRoomInRole?id=${id}`);
}