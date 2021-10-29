import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./DepartmentsUIHelpers";

const DepartmentsUIContext = createContext();

export function useDepartmentsUIContext() {
    return useContext(DepartmentsUIContext);
}

export const DepartmentsUIConsumer = DepartmentsUIContext.Consumer;

export function DepartmentsUIProvider({ departmentsUIEvents, children }) {
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

    const initDepartment = {
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
        initDepartment,
        newDepartmentButtonClick: departmentsUIEvents.newDepartmentButtonClick,
        newDepartmentInRolesButtonClick: departmentsUIEvents.newDepartmentInRolesButtonClick,
        openEditDepartmentDialog: departmentsUIEvents.openEditDepartmentDialog,
        openDeleteDepartmentDialog: departmentsUIEvents.openDeleteDepartmentDialog,
        openEditDepartmentInRoleDialog: departmentsUIEvents.openEditDepartmentInRoleDialog,
        openDeleteDepartmentInRolesDialog: departmentsUIEvents.openDeleteDepartmentInRolesDialog,
    };

    return <DepartmentsUIContext.Provider value={value}>{children}</DepartmentsUIContext.Provider>;
}