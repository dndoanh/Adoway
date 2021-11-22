import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PaymentRequestsFilter } from "./payment-requests-filter/PaymentRequestFilter";
import { PaymentRequestsTable } from "./payment-requests-table/PaymentRequestsTable";
import { usePaymentRequestsUIContext } from "./PaymentRequestsUIContext";

export function PaymentRequestsCard() {
  const paymentRequestsUIContext = usePaymentRequestsUIContext();
  const paymentRequestsUIProps = useMemo(() => {
    return {
      newPaymentRequestButtonClick: paymentRequestsUIContext.newPaymentRequestButtonClick,
    };
  }, [paymentRequestsUIContext]);

  return (
    <Card>
      <CardHeader title="PaymentRequests list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={paymentRequestsUIProps.newPaymentRequestButtonClick}
          >
            New Payment Request
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PaymentRequestsFilter />
        <PaymentRequestsTable />
      </CardBody>
    </Card>
  );
}
