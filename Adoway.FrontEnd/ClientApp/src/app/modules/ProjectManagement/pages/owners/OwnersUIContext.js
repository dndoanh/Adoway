import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./OwnersUIHelpers";

const OwnersUIContext = createContext();

export function useOwnersUIContext() {
    return useContext(OwnersUIContext);
}

export const OwnersUIConsumer = OwnersUIContext.Consumer;

export function OwnersUIProvider({ ownersUIEvents, children }) {
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

    const initOwner = {
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
        initOwner,
        newOwnerButtonClick: ownersUIEvents.newOwnerButtonClick,
        newOwnerInRolesButtonClick: ownersUIEvents.newOwnerInRolesButtonClick,
        openEditOwnerDialog: ownersUIEvents.openEditOwnerDialog,
        openDeleteOwnerDialog: ownersUIEvents.openDeleteOwnerDialog,
        openEditOwnerInRoleDialog: ownersUIEvents.openEditOwnerInRoleDialog,
        openDeleteOwnerInRolesDialog: ownersUIEvents.openDeleteOwnerInRolesDialog,
    };

    return <OwnersUIContext.Provider value={value}>{children}</OwnersUIContext.Provider>;
}