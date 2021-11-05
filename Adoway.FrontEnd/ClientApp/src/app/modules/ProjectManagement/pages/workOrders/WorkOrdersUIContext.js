import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./WorkOrdersUIHelpers";

const WorkOrdersUIContext = createContext();

export function useWorkOrdersUIContext() {
    return useContext(WorkOrdersUIContext);
}

export const WorkOrdersUIConsumer = WorkOrdersUIContext.Consumer;

export function WorkOrdersUIProvider({ workOrdersUIEvents, children }) {
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

    const initWorkOrder = {
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
        initWorkOrder,
        openEditWorkOrderPage: workOrdersUIEvents.openEditWorkOrderPage,
        newWorkOrderButtonClick: workOrdersUIEvents.newWorkOrderButtonClick,
        openDeleteWorkOrderDialog: workOrdersUIEvents.openDeleteWorkOrderDialog,
    };

    return <WorkOrdersUIContext.Provider value={value}>{children}</WorkOrdersUIContext.Provider>;
}