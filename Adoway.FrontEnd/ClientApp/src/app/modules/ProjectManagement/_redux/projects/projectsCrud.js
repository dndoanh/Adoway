import axios from "axios";

export const PROJECTS_URL = `${process.env.REACT_APP_API_URL}/project`;

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result

export function getAllProjects() {
    return axios.get(PROJECTS_URL + '/getProjects');
}

export function findProjects(queryParams) {
    return axios.post(`${PROJECTS_URL}/searchProjects`, queryParams);
}

// CREATE =>  POST: add a new project to the server
export function createProject(project) {
    return axios.post(`${PROJECTS_URL}/createProject`, project);
}

// UPDATE => PUT: update the project on the server
export function updateProject(project) {
    return axios.post(`${PROJECTS_URL}/updateProject`, project);
}

// DELETE => delete the project from the server
export function deleteProject(projectId) {
    return axios.post(`${PROJECTS_URL}/deleteProject?id=${projectId}`);
}

export function getProjectInRoles(projectId) {
    return axios.get(`${PROJECTS_URL}/getProjectInRoles?id=${projectId}`);
}

export function createProjectInRoles(projectInRoles) {
    return axios.post(`${PROJECTS_URL}/createProjectInRole`, projectInRoles);
}

export function deleteProjectInRoles(id) {
    return axios.post(`${PROJECTS_URL}/deleteProjectInRole?id=${id}`);
}