import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PaymentRequestsUIHelpers";

const PaymentRequestsUIContext = createContext();

export function usePaymentRequestsUIContext() {
    return useContext(PaymentRequestsUIContext);
}

export const PaymentRequestsUIConsumer = PaymentRequestsUIContext.Consumer;

export function PaymentRequestsUIProvider({ paymentRequestsUIEvents, children }) {
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

    const initPaymentRequest = {
        id: undefined,
        requestNo: "",
        projectId: undefined,
        status: 0,
       
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initPaymentRequest,
        openEditPaymentRequestPage: paymentRequestsUIEvents.openEditPaymentRequestPage,
        newPaymentRequestButtonClick: paymentRequestsUIEvents.newPaymentRequestButtonClick,
        openDeletePaymentRequestDialog: paymentRequestsUIEvents.openDeletePaymentRequestDialog,
    };

    return <PaymentRequestsUIContext.Provider value={value}>{children}</PaymentRequestsUIContext.Provider>;
}