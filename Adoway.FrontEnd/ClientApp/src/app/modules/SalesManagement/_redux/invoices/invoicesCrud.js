import axios from "axios";

export const PROJECTS_URL = `${process.env.REACT_APP_API_URL}/invoice`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllInvoices() {
    return axios.get(PROJECTS_URL + '/getInvoices');
}

export function findInvoices(queryParams) {
    return axios.post(`${PROJECTS_URL}/searchInvoices`, queryParams);
}

// CREATE =>  POST: add a new invoice to the server
export function createInvoice(invoice) {
    return axios.post(`${PROJECTS_URL}/createInvoice`, invoice);
}

// UPDATE => PUT: update the invoice on the server
export function updateInvoice(invoice) {
    return axios.post(`${PROJECTS_URL}/updateInvoice`, invoice);
}

// DELETE => delete the invoice from the server
export function deleteInvoice(invoiceId) {
    return axios.post(`${PROJECTS_URL}/deleteInvoice?id=${invoiceId}`);
}

export function getInvoiceInRoles(invoiceId) {
    return axios.get(`${PROJECTS_URL}/getInvoiceInRoles?id=${invoiceId}`);
}

export function createInvoiceInRoles(invoiceInRoles) {
    return axios.post(`${PROJECTS_URL}/createInvoiceInRole`, invoiceInRoles);
}

export function deleteInvoiceInRoles(id) {
    return axios.post(`${PROJECTS_URL}/deleteInvoiceInRole?id=${id}`);
}