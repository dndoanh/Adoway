import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TeleVendorsUIHelpers";

const TeleVendorsUIContext = createContext();

export function useTeleVendorsUIContext() {
    return useContext(TeleVendorsUIContext);
}

export const TeleVendorsUIConsumer = TeleVendorsUIContext.Consumer;

export function TeleVendorsUIProvider({ teleVendorsUIEvents, children }) {
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

    const initTeleVendor = {
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
        initTeleVendor,
        newTeleVendorButtonClick: teleVendorsUIEvents.newTeleVendorButtonClick,
        newTeleVendorInRolesButtonClick: teleVendorsUIEvents.newTeleVendorInRolesButtonClick,
        openEditTeleVendorDialog: teleVendorsUIEvents.openEditTeleVendorDialog,
        openDeleteTeleVendorDialog: teleVendorsUIEvents.openDeleteTeleVendorDialog,
        openEditTeleVendorInRoleDialog: teleVendorsUIEvents.openEditTeleVendorInRoleDialog,
        openDeleteTeleVendorInRolesDialog: teleVendorsUIEvents.openDeleteTeleVendorInRolesDialog,
    };

    return <TeleVendorsUIContext.Provider value={value}>{children}</TeleVendorsUIContext.Provider>;
}