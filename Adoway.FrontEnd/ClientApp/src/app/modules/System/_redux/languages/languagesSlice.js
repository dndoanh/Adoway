import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialLanguagesState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    allLanguages: [],
    languageForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const languagesSlice = createSlice({
    name: "languages",
    initialState: initialLanguagesState,
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
        // languageSelected
        languageSelected: (state, action) => {
            state.languageForEdit = _.find(state.entities, { id: action.payload.id });
        },
        // getLanguageById
        languageFetched: (state, action) => {
            state.actionsLoading = false;
            state.languageForEdit = action.payload.languageForEdit;
            state.error = null;
        },
        // getLanguages
        allLanguagesFetched: (state, action) => {
            const languages = action.payload;
            state.allLanguages = languages;
        },
        // findLanguages
        languagesFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
        // createLanguage
        languageCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            state.entities.push(action.payload.language);
        },
        // updateLanguage
        languageUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.language.id) {
                    return action.payload.language;
                }
                return entity;
            });
        },
        // deleteLanguage
        languageDeleted: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
    }
});
