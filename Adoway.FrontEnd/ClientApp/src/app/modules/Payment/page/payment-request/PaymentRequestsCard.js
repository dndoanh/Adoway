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
import { shallowEqual, useSelector } from "react-redux";

export function PaymentRequestsCard() {
  const paymentRequestsUIContext = usePaymentRequestsUIContext();
  const paymentRequestsUIProps = useMemo(() => {
    return {
      newPaymentRequestButtonClick: paymentRequestsUIContext.newPaymentRequestButtonClick,
    };
  }, [paymentRequestsUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddPayment = user.functions.find(x => x.code == "CreatePaymentRequest")
  return (
    <Card>
      <CardHeader title="PaymentRequests list">
            <CardHeaderToolbar>
            {user.isSuperAdmin || (AddPayment &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={paymentRequestsUIProps.newPaymentRequestButtonClick}
                >
                    New Payment Request
                </button>
            )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PaymentRequestsFilter />
        <PaymentRequestsTable />
      </CardBody>
    </Card>
  );
}
