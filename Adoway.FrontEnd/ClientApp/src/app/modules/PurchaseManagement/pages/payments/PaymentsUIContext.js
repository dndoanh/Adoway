import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PaymentsUIHelpers";

const PaymentsUIContext = createContext();

export function usePaymentsUIContext() {
    return useContext(PaymentsUIContext);
}

export const PaymentsUIConsumer = PaymentsUIContext.Consumer;

export function PaymentsUIProvider({ paymentsUIEvents, children }) {
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

    const initPayment = {
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
        initPayment,
        openEditPaymentPage: paymentsUIEvents.openEditPaymentPage,
        newPaymentButtonClick: paymentsUIEvents.newPaymentButtonClick,
        openDeletePaymentDialog: paymentsUIEvents.openDeletePaymentDialog,
    };

    return <PaymentsUIContext.Provider value={value}>{children}</PaymentsUIContext.Provider>;
}