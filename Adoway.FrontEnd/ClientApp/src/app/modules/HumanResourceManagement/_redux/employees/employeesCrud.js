import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/employee`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findEmployees(queryParams) {
    return axios.post(`${USERS_URL}/searchEmployees`, queryParams);
}

// CREATE =>  POST: add a new employee to the server
export function createEmployee(employee) {
    return axios.post(`${USERS_URL}/createEmployee`, employee);
}

// UPDATE => PUT: update the employee on the server
export function updateEmployee(employee) {
    return axios.post(`${USERS_URL}/updateEmployee`, employee);
}

// DELETE => delete the employee from the server
export function deleteEmployee(employeeId) {
    return axios.post(`${USERS_URL}/deleteEmployee?id=${employeeId}`);
}

export function getEmployeeInRoles(employeeId) {
    return axios.get(`${USERS_URL}/getEmployeeInRoles?id=${employeeId}`);
}

export function createEmployeeInRoles(employeeInRoles) {
    return axios.post(`${USERS_URL}/createEmployeeInRole`, employeeInRoles);
}

export function deleteEmployeeInRoles(id) {
    return axios.post(`${USERS_URL}/deleteEmployeeInRole?id=${id}`);
}