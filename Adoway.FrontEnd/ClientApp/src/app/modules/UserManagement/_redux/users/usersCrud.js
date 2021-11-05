import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/user`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers(queryParams) {
    return axios.post(`${USERS_URL}/searchUsers`, queryParams);
}

export function getAllUsers() {
    return axios.get(USERS_URL + '/getUsers');
}

// CREATE =>  POST: add a new user to the server
export function createUser(user) {
    return axios.post(`${USERS_URL}/createUser`, user);
}

// UPDATE => PUT: update the user on the server
export function updateUser(user) {
    return axios.post(`${USERS_URL}/updateUser`, user);
}

// DELETE => delete the user from the server
export function deleteUser(userId) {
    return axios.post(`${USERS_URL}/deleteUser?id=${userId}`);
}

export function getUserInRoles(userId) {
    return axios.get(`${USERS_URL}/getUserInRoles?id=${userId}`);
}

export function createUserInRoles(userInRoles) {
    return axios.post(`${USERS_URL}/createUserInRole`, userInRoles);
}

export function deleteUserInRoles(id) {
    return axios.post(`${USERS_URL}/deleteUserInRole?id=${id}`);
}