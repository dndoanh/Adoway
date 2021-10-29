import axios from "axios";

export const USERS_URL = `${process.env.REACT_APP_API_URL}/project`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProjects(queryParams) {
    return axios.post(`${USERS_URL}/searchProjects`, queryParams);
}

// CREATE =>  POST: add a new project to the server
export function createProject(project) {
    return axios.post(`${USERS_URL}/createProject`, project);
}

// UPDATE => PUT: update the project on the server
export function updateProject(project) {
    return axios.post(`${USERS_URL}/updateProject`, project);
}

// DELETE => delete the project from the server
export function deleteProject(projectId) {
    return axios.post(`${USERS_URL}/deleteProject?id=${projectId}`);
}

export function getProjectInRoles(projectId) {
    return axios.get(`${USERS_URL}/getProjectInRoles?id=${projectId}`);
}

export function createProjectInRoles(projectInRoles) {
    return axios.post(`${USERS_URL}/createProjectInRole`, projectInRoles);
}

export function deleteProjectInRoles(id) {
    return axios.post(`${USERS_URL}/deleteProjectInRole?id=${id}`);
}