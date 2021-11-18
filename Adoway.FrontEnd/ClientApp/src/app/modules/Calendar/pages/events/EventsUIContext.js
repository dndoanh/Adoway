import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./EventsUIHelpers";

const EventsUIContext = createContext();

export function useEventsUIContext() {
    return useContext(EventsUIContext);
}

export const EventsUIConsumer = EventsUIContext.Consumer;

export function EventsUIProvider({ eventsUIEvents, children }) {
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

    const initEvent = {
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
        initEvent,
        openNewPage: eventsUIEvents.openNewPage,
        openDetailPage: eventsUIEvents.openDetailPage,
        openEditPage: eventsUIEvents.openEditPage,
        openNewDetailPage: eventsUIEvents.openNewDetailPage,
    };

    return <EventsUIContext.Provider value={value}>{children}</EventsUIContext.Provider>;
}