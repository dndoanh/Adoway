import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./LanguagesUIHelpers";

const LanguagesUIContext = createContext();

export function useLanguagesUIContext() {
  return useContext(LanguagesUIContext);
}

export const LanguagesUIConsumer = LanguagesUIContext.Consumer;

export function LanguagesUIProvider({languagesUIEvents, children}) {
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

  const initLanguage = {
    id: undefined,
    name: "",
    locale: "",
    status: 0,
    isDefault: false
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    initLanguage,
    newLanguageButtonClick: languagesUIEvents.newLanguageButtonClick,
    openEditLanguageDialog: languagesUIEvents.openEditLanguageDialog,
    openDeleteLanguageDialog: languagesUIEvents.openDeleteLanguageDialog
  };

  return <LanguagesUIContext.Provider value={value}>{children}</LanguagesUIContext.Provider>;
}