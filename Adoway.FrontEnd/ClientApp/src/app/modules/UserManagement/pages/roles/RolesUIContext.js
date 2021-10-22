import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./RolesUIHelpers";

const RolesUIContext = createContext();

export function useRolesUIContext() {
    return useContext(RolesUIContext);
}

export const RolesUIConsumer = RolesUIContext.Consumer;

export function RolesUIProvider({ rolesUIEvents, children }) {
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

    const initRole = {
        id: undefined,
        name: "",
        description: "",
        status: 0
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initRole,
        newRoleButtonClick: rolesUIEvents.newRoleButtonClick,
        openEditRoleDialog: rolesUIEvents.openEditRoleDialog,
        openEditRoleInScreensDialog: rolesUIEvents.openEditRoleInScreensDialog,
        openDeleteRoleDialog: rolesUIEvents.openDeleteRoleDialog
    };

    return <RolesUIContext.Provider value={value}>{children}</RolesUIContext.Provider>;
}