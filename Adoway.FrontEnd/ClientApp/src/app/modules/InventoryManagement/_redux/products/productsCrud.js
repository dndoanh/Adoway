import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/product`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts(queryParams) {
    return axios.post(`${USERS_URL}/searchProducts`, queryParams);
}

// CREATE =>  POST: add a new product to the server
export function createProduct(product) {
    return axios.post(`${USERS_URL}/createProduct`, product);
}

// UPDATE => PUT: update the product on the server
export function updateProduct(product) {
    return axios.post(`${USERS_URL}/updateProduct`, product);
}

// DELETE => delete the product from the server
export function deleteProduct(productId) {
    return axios.post(`${USERS_URL}/deleteProduct?id=${productId}`);
}
