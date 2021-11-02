import axios from "axios";

export const OWNERS_URL = `${process.env.REACT_APP_API_URL}/owner`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllOwners() {
    return axios.get(OWNERS_URL + '/getOwners');
}

export function findOwner(queryParams) {
    return axios.post(`${OWNERS_URL}/searchOwners`, queryParams);
}

// CREATE =>  POST: add a new owner to the server
export function createOwner(owner) {
    return axios.post(`${OWNERS_URL}/createOwner`, owner);
}

// UPDATE => PUT: update the owner on the server
export function updateOwner(owner) {
    return axios.post(`${OWNERS_URL}/updateOwner`, owner);
}

// DELETE => delete the owner from the server
export function deleteOwner(ownerId) {
    return axios.post(`${OWNERS_URL}/deleteOwner?id=${ownerId}`);
}

export function getOwnerInRoles(ownerId) {
    return axios.get(`${OWNERS_URL}/getOwnerInRoles?id=${ownerId}`);
}

export function createOwnerInRoles(ownerInRoles) {
    return axios.post(`${OWNERS_URL}/createOwnerInRole`, ownerInRoles);
}

export function deleteOwnerInRoles(id) {
    return axios.post(`${OWNERS_URL}/deleteOwnerInRole?id=${id}`);
}