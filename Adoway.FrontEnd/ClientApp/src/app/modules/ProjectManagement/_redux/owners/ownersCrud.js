import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/owner`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findOwner(queryParams) {
    return axios.post(`${USERS_URL}/searchOwners`, queryParams);
}

// CREATE =>  POST: add a new owner to the server
export function createOwner(owner) {
    return axios.post(`${USERS_URL}/createOwner`, owner);
}

// UPDATE => PUT: update the owner on the server
export function updateOwner(owner) {
    return axios.post(`${USERS_URL}/updateOwner`, owner);
}

// DELETE => delete the owner from the server
export function deleteOwner(ownerId) {
    return axios.post(`${USERS_URL}/deleteOwner?id=${ownerId}`);
}

export function getOwnerInRoles(ownerId) {
    return axios.get(`${USERS_URL}/getOwnerInRoles?id=${ownerId}`);
}

export function createOwnerInRoles(ownerInRoles) {
    return axios.post(`${USERS_URL}/createOwnerInRole`, ownerInRoles);
}

export function deleteOwnerInRoles(id) {
    return axios.post(`${USERS_URL}/deleteOwnerInRole?id=${id}`);
}