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
        newProjectButtonClick: projectsUIEvents.newProjectButtonClick,
        newProjectInRolesButtonClick: projectsUIEvents.newProjectInRolesButtonClick,
        openEditProjectDialog: projectsUIEvents.openEditProjectDialog,
        openDeleteProjectDialog: projectsUIEvents.openDeleteProjectDialog,
        openEditProjectInRoleDialog: projectsUIEvents.openEditProjectInRoleDialog,
        openDeleteProjectInRolesDialog: projectsUIEvents.openDeleteProjectInRolesDialog,
    };

    return <ProjectsUIContext.Provider value={value}>{children}</ProjectsUIContext.Provider>;
}