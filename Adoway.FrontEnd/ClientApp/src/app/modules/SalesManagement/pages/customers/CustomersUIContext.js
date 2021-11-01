import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CustomersUIHelpers";

const CustomersUIContext = createContext();

export function useCustomersUIContext() {
    return useContext(CustomersUIContext);
}

export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
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

    const initCustomer = {
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
        initCustomer,
        newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
        newCustomerInRolesButtonClick: customersUIEvents.newCustomerInRolesButtonClick,
        openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
        openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
        openEditCustomerInRoleDialog: customersUIEvents.openEditCustomerInRoleDialog,
        openDeleteCustomerInRolesDialog: customersUIEvents.openDeleteCustomerInRolesDialog,
    };

    return <CustomersUIContext.Provider value={value}>{children}</CustomersUIContext.Provider>;
}