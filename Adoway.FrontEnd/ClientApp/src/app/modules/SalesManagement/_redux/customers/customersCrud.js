import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/customer`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
    return axios.post(`${USERS_URL}/searchCustomers`, queryParams);
}

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
    return axios.post(`${USERS_URL}/createCustomer`, customer);
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
    return axios.post(`${USERS_URL}/updateCustomer`, customer);
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
    return axios.post(`${USERS_URL}/deleteCustomer?id=${customerId}`);
}
