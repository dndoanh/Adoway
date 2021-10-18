import axios from "axios";

export const ENTERPRISES_URL = `${process.env.REACT_APP_API_URL}/enterprise`;

// READ
export function getAllEnterprises() {
    return axios.get(ENTERPRISES_URL + '/getEnterprises');
}

// SEARCH
export function findEnterprises(queryParams) {
    return axios.post(`${ENTERPRISES_URL}/searchEnterprises`, queryParams);
}

// CREATE =>  POST: add a new enterprise to the server
export function createEnterprise(enterprise) {
    return axios.post(`${ENTERPRISES_URL}/createEnterprise`, enterprise);
}

// UPDATE => PUT: update the enterprise on the server
export function updateEnterprise(enterprise) {
    return axios.post(`${ENTERPRISES_URL}/updateEnterprise`, enterprise);
}

// DELETE => delete the enterprise from the server
export function deleteEnterprise(enterpriseId) {
    return axios.post(`${ENTERPRISES_URL}/deleteEnterprise?id=${enterpriseId}`);
}
