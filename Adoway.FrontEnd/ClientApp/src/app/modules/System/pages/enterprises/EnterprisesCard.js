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
import { FormattedMessage, useIntl } from 'react-intl';

export function EnterprisesCard() {
  const enterprisesUIContext = useEnterprisesUIContext();
  const enterprisesUIProps = useMemo(() => {
    return {
      newEnterpriseButtonClick: enterprisesUIContext.newEnterpriseButtonClick,
    };
  }, [enterprisesUIContext]);

    const intl = useIntl()
    const list = intl.formatMessage({ id: "ENTERPRISE.ENTERPRISE_LIST" })

  return (
    <Card>
    <CardHeader title={list}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={enterprisesUIProps.newEnterpriseButtonClick}
          >
            <FormattedMessage
                id="ENTERPRISE.NEW_ENTERPRISE"
            />
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
