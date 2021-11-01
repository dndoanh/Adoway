import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SuppliersUIHelpers";

const SuppliersUIContext = createContext();

export function useSuppliersUIContext() {
    return useContext(SuppliersUIContext);
}

export const SuppliersUIConsumer = SuppliersUIContext.Consumer;

export function SuppliersUIProvider({ suppliersUIEvents, children }) {
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

    const initSupplier = {
        id: undefined,
        name: "",
        enterpriseId:"1b759bb9-743b-4e7d-a831-70f3f667c824",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        status: 0,
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initSupplier,
        newSupplierButtonClick: suppliersUIEvents.newSupplierButtonClick,
        newSupplierInRolesButtonClick: suppliersUIEvents.newSupplierInRolesButtonClick,
        openEditSupplierDialog: suppliersUIEvents.openEditSupplierDialog,
        openDeleteSupplierDialog: suppliersUIEvents.openDeleteSupplierDialog,
        openEditSupplierInRoleDialog: suppliersUIEvents.openEditSupplierInRoleDialog,
        openDeleteSupplierInRolesDialog: suppliersUIEvents.openDeleteSupplierInRolesDialog,
    };

    return <SuppliersUIContext.Provider value={value}>{children}</SuppliersUIContext.Provider>;
}