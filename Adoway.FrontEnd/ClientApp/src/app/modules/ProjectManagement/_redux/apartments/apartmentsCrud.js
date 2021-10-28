import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/apartment`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findApartments(queryParams) {
    return axios.post(`${USERS_URL}/searchApartments`, queryParams);
}

// CREATE =>  POST: add a new apartment to the server
export function createApartment(apartment) {
    return axios.post(`${USERS_URL}/createApartment`, apartment);
}

// UPDATE => PUT: update the apartment on the server
export function updateApartment(apartment) {
    return axios.post(`${USERS_URL}/updateApartment`, apartment);
}

// DELETE => delete the apartment from the server
export function deleteApartment(apartmentId) {
    return axios.post(`${USERS_URL}/deleteApartment?id=${apartmentId}`);
}

export function getApartmentInRoles(apartmentId) {
    return axios.get(`${USERS_URL}/getApartmentInRoles?id=${apartmentId}`);
}

export function createApartmentInRoles(apartmentInRoles) {
    return axios.post(`${USERS_URL}/createApartmentInRole`, apartmentInRoles);
}

export function deleteApartmentInRoles(id) {
    return axios.post(`${USERS_URL}/deleteApartmentInRole?id=${id}`);
}