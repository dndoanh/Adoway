import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { LanguagesFilter } from "./languages-filter/LanguagesFilter";
import { LanguagesTable } from "./languages-table/LanguagesTable";
import { useLanguagesUIContext } from "./LanguagesUIContext";
import { FormattedMessage, useIntl } from 'react-intl';
export function LanguagesCard() {
  const languagesUIContext = useLanguagesUIContext();
  const languagesUIProps = useMemo(() => {
    return {
      newLanguageButtonClick: languagesUIContext.newLanguageButtonClick,
    };
  }, [languagesUIContext]);

    const intl = useIntl()
    const list = intl.formatMessage({ id: "LANGUAGE.LANGUAGE_LIST" })

  return (
    <Card>
    <CardHeader title={list}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={languagesUIProps.newLanguageButtonClick}
          >
            <FormattedMessage
                id="LANGUAGE.NEW_LANGUAGE"
            />
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LanguagesFilter />
        <LanguagesTable />
      </CardBody>
    </Card>
  );
}
