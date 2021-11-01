import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CategoriesUIHelpers";

const CategoriesUIContext = createContext();

export function useCategoriesUIContext() {
    return useContext(CategoriesUIContext);
}

export const CategoriesUIConsumer = CategoriesUIContext.Consumer;

export function CategoriesUIProvider({ categoriesUIEvents, children }) {
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

    const initCategory = {
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
        initCategory,
        newCategoryButtonClick: categoriesUIEvents.newCategoryButtonClick,
        newCategoryInRolesButtonClick: categoriesUIEvents.newCategoryInRolesButtonClick,
        openEditCategoryDialog: categoriesUIEvents.openEditCategoryDialog,
        openDeleteCategoryDialog: categoriesUIEvents.openDeleteCategoryDialog,
        openEditCategoryInRoleDialog: categoriesUIEvents.openEditCategoryInRoleDialog,
        openDeleteCategoryInRolesDialog: categoriesUIEvents.openDeleteCategoryInRolesDialog,
    };

    return <CategoriesUIContext.Provider value={value}>{children}</CategoriesUIContext.Provider>;
}