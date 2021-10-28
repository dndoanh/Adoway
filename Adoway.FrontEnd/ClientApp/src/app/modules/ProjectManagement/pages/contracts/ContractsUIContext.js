import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ContractsUIHelpers";

const ContractsUIContext = createContext();

export function useContractsUIContext() {
    return useContext(ContractsUIContext);
}

export const ContractsUIConsumer = ContractsUIContext.Consumer;

export function ContractsUIProvider({ contractsUIEvents, children }) {
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

    const initContract = {
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
        initContract,
        newContractButtonClick: contractsUIEvents.newContractButtonClick,
        newContractInRolesButtonClick: contractsUIEvents.newContractInRolesButtonClick,
        openEditContractDialog: contractsUIEvents.openEditContractDialog,
        openDeleteContractDialog: contractsUIEvents.openDeleteContractDialog,
        openEditContractInRoleDialog: contractsUIEvents.openEditContractInRoleDialog,
        openDeleteContractInRolesDialog: contractsUIEvents.openDeleteContractInRolesDialog,
    };

    return <ContractsUIContext.Provider value={value}>{children}</ContractsUIContext.Provider>;
}