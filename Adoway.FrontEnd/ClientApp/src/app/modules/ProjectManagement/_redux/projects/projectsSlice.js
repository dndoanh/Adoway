import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialProjectsState = {
    listLoading: false,
    actionsLoading: false,
    needReload: false,
    totalCount: 0,
    entities: null,
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
            state.projectForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // findProjects
        projectsFetched: (state, action) => {
            const { totalCount, entities} = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
            
        },
        // createProject
        projectCreated: (state, action) => {
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.error = null;
            state.entities.push(action.payload.project);
        },
        // updateProject
        projectUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.needReload = !state.needReload;
            state.entities = state.projects.map(entity => {
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
            state.entities = state.projects.filter(el => el.id !== action.payload.id);
        },
    }
});
