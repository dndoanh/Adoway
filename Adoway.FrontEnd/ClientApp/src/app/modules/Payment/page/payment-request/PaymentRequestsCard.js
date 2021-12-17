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
import { FormattedMessage, useIntl } from 'react-intl';
export function PaymentRequestsCard() {
  const paymentRequestsUIContext = usePaymentRequestsUIContext();
  const paymentRequestsUIProps = useMemo(() => {
    return {
      newPaymentRequestButtonClick: paymentRequestsUIContext.newPaymentRequestButtonClick,
    };
  }, [paymentRequestsUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddPayment = user.functions.find(x => x.code == "CreatePaymentRequest")
    const intl = useIntl()
    const list = intl.formatMessage({ id: "PAYMENT.PAYMENT_LIST" })
  return (
    <Card>
          <CardHeader title={list}>
            <CardHeaderToolbar>
            {user.isSuperAdmin || (AddPayment &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={paymentRequestsUIProps.newPaymentRequestButtonClick}
                >
                      <FormattedMessage
                          id="PAYMENT.NEW_PAYMENT"
                      />
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
