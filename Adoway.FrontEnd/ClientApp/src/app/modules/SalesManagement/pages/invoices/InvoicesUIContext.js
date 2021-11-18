import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./InvoicesUIHelpers";

const InvoicesUIContext = createContext();

export function useInvoicesUIContext() {
    return useContext(InvoicesUIContext);
}

export const InvoicesUIConsumer = InvoicesUIContext.Consumer;

export function InvoicesUIProvider({ invoicesUIEvents, children }) {
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

    const initInvoice = {
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
        initInvoice,
        openEditInvoicePage: invoicesUIEvents.openEditInvoicePage,
        newInvoiceButtonClick: invoicesUIEvents.newInvoiceButtonClick,
        openDeleteInvoiceDialog: invoicesUIEvents.openDeleteInvoiceDialog,
    };

    return <InvoicesUIContext.Provider value={value}>{children}</InvoicesUIContext.Provider>;
}