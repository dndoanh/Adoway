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
            AddCustomer &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={customersUIProps.newCustomerButtonClick}
            >
                New Customer
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
