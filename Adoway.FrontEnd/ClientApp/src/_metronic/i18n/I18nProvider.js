import React from "react";
import {useLang} from "./Metronici18n";
import { IntlProvider } from "react-intl";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../../src/app/modules/System/_redux/languages/languagesActions";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import "@formatjs/intl-relativetimeformat/dist/locale-data/ja";
import "@formatjs/intl-relativetimeformat/dist/locale-data/zh";
import "@formatjs/intl-relativetimeformat/dist/locale-data/vi";

import deMessages from "./messages/de";
import enMessages from "./messages/en";
import esMessages from "./messages/es";
import frMessages from "./messages/fr";
import jaMessages from "./messages/ja";
import zhMessages from "./messages/zh";
import viMessages from "./messages/vi";

const allMessages = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages,
  vi: viMessages
};

export function I18nProvider({ children }) {
/*  const locale = useLang();*/
   
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchAllLanguages)
    }, []);
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const { currentLanguagesState } = useSelector(
        (state) => ({ currentLanguagesState: state.languages }),
        shallowEqual
    );
    const { allLanguages } = currentLanguagesState;
    const lang = user?allLanguages.find(l => l.id == user.languageId):""
    /*   const locale = lang ? lang.locale.substring(0, 2) : "";*/
    const locale="vi"
    const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
