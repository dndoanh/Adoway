import axios from "axios";

export const PROJECTS_URL = `${process.env.REACT_APP_API_URL}/payment`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllPayments() {
    return axios.get(PROJECTS_URL + '/getPayments');
}

export function findPayments(queryParams) {
    return axios.post(`${PROJECTS_URL}/searchPayments`, queryParams);
}

// CREATE =>  POST: add a new payment to the server
export function createPayment(payment) {
    return axios.post(`${PROJECTS_URL}/createPayment`, payment);
}

// UPDATE => PUT: update the payment on the server
export function updatePayment(payment) {
    return axios.post(`${PROJECTS_URL}/updatePayment`, payment);
}

// DELETE => delete the payment from the server
export function deletePayment(paymentId) {
    return axios.post(`${PROJECTS_URL}/deletePayment?id=${paymentId}`);
}

export function getPaymentInRoles(paymentId) {
    return axios.get(`${PROJECTS_URL}/getPaymentInRoles?id=${paymentId}`);
}

export function createPaymentInRoles(paymentInRoles) {
    return axios.post(`${PROJECTS_URL}/createPaymentInRole`, paymentInRoles);
}

export function deletePaymentInRoles(id) {
    return axios.post(`${PROJECTS_URL}/deletePaymentInRole?id=${id}`);
}