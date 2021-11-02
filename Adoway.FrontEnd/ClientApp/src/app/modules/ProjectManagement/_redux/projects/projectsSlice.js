import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialProjectsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    projects: null,
    projectForEdit: undefined,
    lastError: null,
    projects:null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState: initialProjectsState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },

        // projectSelected
        projectSelected: (state, action) => {
            state.projectForEdit = _.find(state.projects, { id: action.payload.id });
        },
        // findProjects
        projectsFetched: (state, action) => {
            const { totalCount, projects } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.projects = projects;
            state.totalCount = totalCount;
            state.projects = state.projects.map(entity => {
                entity.dob = entity.dob && new Date(entity.dob) || null;
                return entity;
            });
            
        },
        // createProject
        projectCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.projects.push(action.payload.project);
        },
        // updateProject
        projectUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.projects = state.projects.map(entity => {
                if (entity.id === action.payload.project.id) {
                    return action.payload.project;
                }
                return entity;
            });
        },
        allProjectsFetched: (state, action) => {
            const projects = action.payload;
            state.allProjects = projects;
        },
        // deleteProject
        projectDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.projects = state.projects.filter(el => el.id !== action.payload.id);
        },
    }
});
