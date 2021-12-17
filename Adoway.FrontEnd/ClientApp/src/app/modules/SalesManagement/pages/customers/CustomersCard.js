import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CustomersFilter } from "./customer-filter/CustomersFilter";
import { CustomersTable } from "./customer-table/CustomersTable";
import { useCustomersUIContext } from "./CustomersUIContext";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';

export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
    };
  }, [customersUIContext]);
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddCustomer = user.functions.find(x => x.code == "CreateCustomer")
  return (
    <Card>
      <CardHeader title="Customers list">
        <CardHeaderToolbar>
        {
             (user.isSuperAdmin || AddCustomer) &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={customersUIProps.newCustomerButtonClick}
            >
            <FormattedMessage
                id="SALES.INVOICES.NEW_INVOICE"
            />
            </button>
           
        }
    </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CustomersFilter />
        <CustomersTable />
      </CardBody>
    </Card>
  );
}
