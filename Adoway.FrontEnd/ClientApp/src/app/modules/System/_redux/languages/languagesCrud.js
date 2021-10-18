import axios from "axios";

export const LANGUAGES_URL = `${process.env.REACT_APP_API_URL}/language`;

// CREATE =>  POST: add a new language to the server
export function createLanguage(language) {
    return axios.post(`${LANGUAGES_URL}/createLanguage`, language);
}

// READ
export function getAllLanguages() {
    return axios.get(LANGUAGES_URL + '/getLanguages');
}

export function getLanguageById(languageId) {
    return axios.get(`${LANGUAGES_URL}/${languageId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findLanguages(queryParams) {
    return axios.post(`${LANGUAGES_URL}/searchLanguages`, queryParams);
}

// UPDATE => PUT: update the language on the server
export function updateLanguage(language) {
    return axios.post(`${LANGUAGES_URL}/updateLanguage`, language);
}

// DELETE => delete the language from the server
export function deleteLanguage(languageId) {
    return axios.post(`${LANGUAGES_URL}/deleteLanguage?id=${languageId}`);
}
