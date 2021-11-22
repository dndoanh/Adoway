import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PaymentsFilter } from "./payments-filter/PaymentsFilter";
import { PaymentsTable } from "./payments-table/PaymentsTable";
import { usePaymentsUIContext } from "./PaymentsUIContext";

export function PaymentsCard() {
  const paymentsUIContext = usePaymentsUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      newPaymentButtonClick: paymentsUIContext.newPaymentButtonClick,
    };
  }, [paymentsUIContext]);

  return (
    <Card>
      <CardHeader title="Payments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={paymentsUIProps.newPaymentButtonClick}
          >
            New Work Order
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PaymentsFilter />
        <PaymentsTable />
      </CardBody>
    </Card>
  );
}
