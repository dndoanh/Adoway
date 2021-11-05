import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProductsUIHelpers";

const ProductsUIContext = createContext();

export function useProductsUIContext() {
    return useContext(ProductsUIContext);
}

export const ProductsUIConsumer = ProductsUIContext.Consumer;

export function ProductsUIProvider({ productsUIEvents, children }) {
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

    const initProduct = {
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
        initProduct,
        openEditProductPage: productsUIEvents.openEditProductPage,
        newProductButtonClick: productsUIEvents.newProductButtonClick,
        openDeleteProductDialog: productsUIEvents.openDeleteProductDialog,
    };

    return <ProductsUIContext.Provider value={value}>{children}</ProductsUIContext.Provider>;
}