import axios from "axios";

export const ROLES_URL = `${process.env.REACT_APP_API_URL}/role`;

// Method from server should return All Roles By Enterprise of the User That logged in
export function getAllRoles() {
    return axios.get(`${ROLES_URL}/getRoles`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRoles(queryParams) {
    return axios.post(`${ROLES_URL}/searchRoles`, queryParams);
}

// CREATE =>  POST: add a new role to the server
export function createRole(role) {
    return axios.post(`${ROLES_URL}/createRole`, role);
}

// UPDATE => PUT: update the role on the server
export function updateRole(role) {
    return axios.post(`${ROLES_URL}/updateRole`, role);
}

// DELETE => delete the role from the server
export function deleteRole(roleId) {
    return axios.post(`${ROLES_URL}/deleteRole?id=${roleId}`);
}

export function getRoleInScreens(roleId) {
    return axios.get(`${ROLES_URL}/GetRoleInScreens?id=${roleId}`);
}

export function createRoleInScreens(roleId) {
    return axios.get(`${ROLES_URL}/GetRoleInScreens?id=${roleId}`);
}