import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/contract`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findContracts(queryParams) {
    return axios.post(`${USERS_URL}/searchContracts`, queryParams);
}

// CREATE =>  POST: add a new contract to the server
export function createContract(contract) {
    return axios.post(`${USERS_URL}/createContract`, contract);
}

// UPDATE => PUT: update the contract on the server
export function updateContract(contract) {
    return axios.post(`${USERS_URL}/updateContract`, contract);
}

// DELETE => delete the contract from the server
export function deleteContract(contractId) {
    return axios.post(`${USERS_URL}/deleteContract?id=${contractId}`);
}

export function getContractInRoles(contractId) {
    return axios.get(`${USERS_URL}/getContractInRoles?id=${contractId}`);
}

export function createContractInRoles(contractInRoles) {
    return axios.post(`${USERS_URL}/createContractInRole`, contractInRoles);
}

export function deleteContractInRoles(id) {
    return axios.post(`${USERS_URL}/deleteContractInRole?id=${id}`);
}