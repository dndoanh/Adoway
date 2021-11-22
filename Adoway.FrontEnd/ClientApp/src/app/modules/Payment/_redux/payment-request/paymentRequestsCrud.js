import axios from "axios";

export const PROJECTS_URL = `${process.env.REACT_APP_API_URL}/paymentRequest`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllPaymentRequests() {
    return axios.get(PROJECTS_URL + '/getPaymentRequests');
}

export function findPaymentRequests(queryParams) {
    return axios.post(`${PROJECTS_URL}/searchPaymentRequests`, queryParams);
}

// CREATE =>  POST: add a new paymentRequest to the server
export function createPaymentRequest(paymentRequest) {
    return axios.post(`${PROJECTS_URL}/createPaymentRequest`, paymentRequest);
}

// UPDATE => PUT: update the paymentRequest on the server
export function updatePaymentRequest(paymentRequest) {
    return axios.post(`${PROJECTS_URL}/updatePaymentRequest`, paymentRequest);
}

// DELETE => delete the paymentRequest from the server
export function deletePaymentRequest(paymentRequestId) {
    return axios.post(`${PROJECTS_URL}/deletePaymentRequest?id=${paymentRequestId}`);
}

export function getPaymentRequestInRoles(paymentRequestId) {
    return axios.get(`${PROJECTS_URL}/getPaymentRequestInRoles?id=${paymentRequestId}`);
}

export function createPaymentRequestInRoles(paymentRequestInRoles) {
    return axios.post(`${PROJECTS_URL}/createPaymentRequestInRole`, paymentRequestInRoles);
}

export function deletePaymentRequestInRoles(id) {
    return axios.post(`${PROJECTS_URL}/deletePaymentRequestInRole?id=${id}`);
}