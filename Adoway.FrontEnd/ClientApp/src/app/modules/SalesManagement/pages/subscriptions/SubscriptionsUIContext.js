import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SubscriptionsUIHelpers";

const SubscriptionsUIContext = createContext();

export function useSubscriptionsUIContext() {
    return useContext(SubscriptionsUIContext);
}

export const SubscriptionsUIConsumer = SubscriptionsUIContext.Consumer;

export function SubscriptionsUIProvider({ subscriptionsUIEvents, children }) {
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

    const initSubscription = {
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
        initSubscription,
        exportButtonClick: subscriptionsUIEvents.exportButtonClick,
        importButtonClick: subscriptionsUIEvents.importButtonClick,
        openEditSubscriptionPage: subscriptionsUIEvents.openEditSubscriptionPage,
        newSubscriptionButtonClick: subscriptionsUIEvents.newSubscriptionButtonClick,
        openDeleteSubscriptionDialog: subscriptionsUIEvents.openDeleteSubscriptionDialog,
    };

    return <SubscriptionsUIContext.Provider value={value}>{children}</SubscriptionsUIContext.Provider>;
}