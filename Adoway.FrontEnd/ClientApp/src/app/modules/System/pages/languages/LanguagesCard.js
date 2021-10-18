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

export function LanguagesCard() {
  const languagesUIContext = useLanguagesUIContext();
  const languagesUIProps = useMemo(() => {
    return {
      newLanguageButtonClick: languagesUIContext.newLanguageButtonClick,
    };
  }, [languagesUIContext]);

  return (
    <Card>
      <CardHeader title="Languages list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={languagesUIProps.newLanguageButtonClick}
          >
            New Language
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
