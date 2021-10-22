import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UsersUIHelpers";

const UsersUIContext = createContext();

export function useUsersUIContext() {
    return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({ usersUIEvents, children }) {
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

    const initUser = {
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
        initUser,
        newUserButtonClick: usersUIEvents.newUserButtonClick,
        newUserInRolesButtonClick: usersUIEvents.newUserInRolesButtonClick,
        openEditUserDialog: usersUIEvents.openEditUserDialog,
        openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
        openEditUserInRoleDialog: usersUIEvents.openEditUserInRoleDialog,
        openDeleteUserInRolesDialog: usersUIEvents.openDeleteUserInRolesDialog,
    };

    return <UsersUIContext.Provider value={value}>{children}</UsersUIContext.Provider>;
}