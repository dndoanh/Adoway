import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EnterprisesFilter } from "./enterprises-filter/EnterprisesFilter";
import { EnterprisesTable } from "./enterprises-table/EnterprisesTable";
import { useEnterprisesUIContext } from "./EnterprisesUIContext";

export function EnterprisesCard() {
  const enterprisesUIContext = useEnterprisesUIContext();
  const enterprisesUIProps = useMemo(() => {
    return {
      newEnterpriseButtonClick: enterprisesUIContext.newEnterpriseButtonClick,
    };
  }, [enterprisesUIContext]);

  return (
    <Card>
      <CardHeader title="Enterprises list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={enterprisesUIProps.newEnterpriseButtonClick}
          >
            New Enterprise
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EnterprisesFilter />
        <EnterprisesTable />
      </CardBody>
    </Card>
  );
}
