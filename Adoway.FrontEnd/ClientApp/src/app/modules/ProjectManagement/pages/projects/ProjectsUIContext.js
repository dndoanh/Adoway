import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProjectsUIHelpers";

const ProjectsUIContext = createContext();

export function useProjectsUIContext() {
    return useContext(ProjectsUIContext);
}

export const ProjectsUIConsumer = ProjectsUIContext.Consumer;

export function ProjectsUIProvider({ projectsUIEvents, children }) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const setQueryParams = useCallback(nextQueryParams => {
        setQueryParamsBase(prevQueryParams => {
            if (isFunction(nextQueryParams)) {
                nextQueryParams = nextQueryParams(prevQueryParams);
            }

            if (isEqual(prevQueryParams, nextQueryParams)) {
                return prevQueryParams;
            }

            return nextQueryParams;
        });
    }, []);

    const initProject = {
        id: undefined,
        name: "",
        email: "",
        languageId: undefined,
        status: 0,
        avatarUrl: null
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initProject,
        openEditProjectPage: projectsUIEvents.openEditProjectPage,
        newProjectButtonClick: projectsUIEvents.newProjectButtonClick,
        openDeleteProjectDialog: projectsUIEvents.openDeleteProjectDialog,
    };

    return <ProjectsUIContext.Provider value={value}>{children}</ProjectsUIContext.Provider>;
}