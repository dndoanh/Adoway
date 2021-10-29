import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/teleVendor`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTeleVendors(queryParams) {
    return axios.post(`${USERS_URL}/searchTeleVendors`, queryParams);
}

// CREATE =>  POST: add a new teleVendor to the server
export function createTeleVendor(teleVendor) {
    return axios.post(`${USERS_URL}/createTeleVendor`, teleVendor);
}

// UPDATE => PUT: update the teleVendor on the server
export function updateTeleVendor(teleVendor) {
    return axios.post(`${USERS_URL}/updateTeleVendor`, teleVendor);
}

// DELETE => delete the teleVendor from the server
export function deleteTeleVendor(teleVendorId) {
    return axios.post(`${USERS_URL}/deleteTeleVendor?id=${teleVendorId}`);
}

export function getTeleVendorInRoles(teleVendorId) {
    return axios.get(`${USERS_URL}/getTeleVendorInRoles?id=${teleVendorId}`);
}

export function createTeleVendorInRoles(teleVendorInRoles) {
    return axios.post(`${USERS_URL}/createTeleVendorInRole`, teleVendorInRoles);
}

export function deleteTeleVendorInRoles(id) {
    return axios.post(`${USERS_URL}/deleteTeleVendorInRole?id=${id}`);
}