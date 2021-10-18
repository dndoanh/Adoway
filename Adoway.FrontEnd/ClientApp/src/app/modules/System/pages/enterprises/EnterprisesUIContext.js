import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./EnterprisesUIHelpers";

const EnterprisesUIContext = createContext();

export function useEnterprisesUIContext() {
    return useContext(EnterprisesUIContext);
}

export const EnterprisesUIConsumer = EnterprisesUIContext.Consumer;

export function EnterprisesUIProvider({ enterprisesUIEvents, children }) {
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

    const initEnterprise = {
        id: undefined,
        name: "",
        email: "",
        phone: "",
        address: "",
        status: 0,
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initEnterprise,
        newEnterpriseButtonClick: enterprisesUIEvents.newEnterpriseButtonClick,
        openEditEnterpriseDialog: enterprisesUIEvents.openEditEnterpriseDialog,
        openDeleteEnterpriseDialog: enterprisesUIEvents.openDeleteEnterpriseDialog
    };

    return <EnterprisesUIContext.Provider value={value}>{children}</EnterprisesUIContext.Provider>;
}