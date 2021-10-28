import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ApartmentsUIHelpers";

const ApartmentsUIContext = createContext();

export function useApartmentsUIContext() {
    return useContext(ApartmentsUIContext);
}

export const ApartmentsUIConsumer = ApartmentsUIContext.Consumer;

export function ApartmentsUIProvider({ apartmentsUIEvents, children }) {
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

    const initApartment = {
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
        initApartment,
        newApartmentButtonClick: apartmentsUIEvents.newApartmentButtonClick,
        newApartmentInRolesButtonClick: apartmentsUIEvents.newApartmentInRolesButtonClick,
        openEditApartmentDialog: apartmentsUIEvents.openEditApartmentDialog,
        openDeleteApartmentDialog: apartmentsUIEvents.openDeleteApartmentDialog,
        openEditApartmentInRoleDialog: apartmentsUIEvents.openEditApartmentInRoleDialog,
        openDeleteApartmentInRolesDialog: apartmentsUIEvents.openDeleteApartmentInRolesDialog,
    };

    return <ApartmentsUIContext.Provider value={value}>{children}</ApartmentsUIContext.Provider>;
}