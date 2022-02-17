import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/category`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllCategories() {
    return axios.get(USERS_URL + '/getCategories');
}

export function findCategories(queryParams) {
    return axios.post(`${USERS_URL}/searchCategories`, queryParams);
}

// CREATE =>  POST: add a new category to the server
export function createCategory(category) {
    return axios.post(`${USERS_URL}/createCategory`, category);
}

// UPDATE => PUT: update the category on the server
export function updateCategory(category) {
    return axios.post(`${USERS_URL}/updateCategory`, category);
}

// DELETE => delete the category from the server
export function deleteCategory(categoryId) {
    return axios.post(`${USERS_URL}/deleteCategory?id=${categoryId}`);
}
 