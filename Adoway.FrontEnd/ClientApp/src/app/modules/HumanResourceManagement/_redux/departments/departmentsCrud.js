import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/department`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDepartments(queryParams) {
    return axios.post(`${USERS_URL}/searchDepartments`, queryParams);
}

// CREATE =>  POST: add a new department to the server
export function createDepartment(department) {
    return axios.post(`${USERS_URL}/createDepartment`, department);
}

// UPDATE => PUT: update the department on the server
export function updateDepartment(department) {
    return axios.post(`${USERS_URL}/updateDepartment`, department);
}

// DELETE => delete the department from the server
export function deleteDepartment(departmentId) {
    return axios.post(`${USERS_URL}/deleteDepartment?id=${departmentId}`);
}

export function getDepartmentInRoles(departmentId) {
    return axios.get(`${USERS_URL}/getDepartmentInRoles?id=${departmentId}`);
}

export function createDepartmentInRoles(departmentInRoles) {
    return axios.post(`${USERS_URL}/createDepartmentInRole`, departmentInRoles);
}

export function deleteDepartmentInRoles(id) {
    return axios.post(`${USERS_URL}/deleteDepartmentInRole?id=${id}`);
}