import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./EmployeesUIHelpers";

const EmployeesUIContext = createContext();

export function useEmployeesUIContext() {
    return useContext(EmployeesUIContext);
}

export const EmployeesUIConsumer = EmployeesUIContext.Consumer;

export function EmployeesUIProvider({ employeesUIEvents, children }) {
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

    const initEmployee = {
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
        initEmployee,
        newEmployeeButtonClick: employeesUIEvents.newEmployeeButtonClick,
        newEmployeeInRolesButtonClick: employeesUIEvents.newEmployeeInRolesButtonClick,
        openEditEmployeeDialog: employeesUIEvents.openEditEmployeeDialog,
        openDeleteEmployeeDialog: employeesUIEvents.openDeleteEmployeeDialog,
        openEditEmployeeInRoleDialog: employeesUIEvents.openEditEmployeeInRoleDialog,
        openDeleteEmployeeInRolesDialog: employeesUIEvents.openDeleteEmployeeInRolesDialog,
    };

    return <EmployeesUIContext.Provider value={value}>{children}</EmployeesUIContext.Provider>;
}