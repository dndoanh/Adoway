import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/workOrder`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findWorkOrders(queryParams) {
    return axios.post(`${USERS_URL}/searchWorkOrders`, queryParams);
}

// CREATE =>  POST: add a new workOrder to the server
export function createWorkOrder(workOrder) {
    return axios.post(`${USERS_URL}/createWorkOrder`, workOrder);
}

// UPDATE => PUT: update the workOrder on the server
export function updateWorkOrder(workOrder) {
    return axios.post(`${USERS_URL}/updateWorkOrder`, workOrder);
}

// DELETE => delete the workOrder from the server
export function deleteWorkOrder(workOrderId) {
    return axios.post(`${USERS_URL}/deleteWorkOrder?id=${workOrderId}`);
}

export function getWorkOrderInRoles(workOrderId) {
    return axios.get(`${USERS_URL}/getWorkOrderInRoles?id=${workOrderId}`);
}

export function createWorkOrderInRoles(workOrderInRoles) {
    return axios.post(`${USERS_URL}/createWorkOrderInRole`, workOrderInRoles);
}

export function deleteWorkOrderInRoles(id) {
    return axios.post(`${USERS_URL}/deleteWorkOrderInRole?id=${id}`);
}