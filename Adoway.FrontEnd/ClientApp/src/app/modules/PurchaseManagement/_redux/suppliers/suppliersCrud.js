import axios from "axios";

export const OWNERS_URL = `${process.env.REACT_APP_API_URL}/supplier`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSupplier(queryParams) {
    return axios.post(`${OWNERS_URL}/searchSuppliers`, queryParams);
}

// CREATE =>  POST: add a new supplier to the server
export function createSupplier(supplier) {
    return axios.post(`${OWNERS_URL}/createSupplier`, supplier);
}

// UPDATE => PUT: update the supplier on the server
export function updateSupplier(supplier) {
    return axios.post(`${OWNERS_URL}/updateSupplier`, supplier);
}

// DELETE => delete the supplier from the server
export function deleteSupplier(supplierId) {
    return axios.post(`${OWNERS_URL}/deleteSupplier?id=${supplierId}`);
}
