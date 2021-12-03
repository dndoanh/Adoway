import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { InvoicesFilter } from "./invoices-filter/InvoicesFilter";
import { InvoicesTable } from "./invoices-table/InvoicesTable";
import { useInvoicesUIContext } from "./InvoicesUIContext";
import { shallowEqual, useSelector } from "react-redux";

export function InvoicesCard() {
  const invoicesUIContext = useInvoicesUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      newInvoiceButtonClick: invoicesUIContext.newInvoiceButtonClick,
    };
  }, [invoicesUIContext]);
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddInvoice = user.functions.find(x => x.code == "CreateInvoice")
  return (
    <Card>
      <CardHeader title="Invoices list">
        <CardHeaderToolbar>
        {
              user.isSuperAdmin || (AddInvoice  &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={invoicesUIProps.newInvoiceButtonClick}
            >
                New Invoice
            </button>
            )
        }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InvoicesFilter />
        <InvoicesTable />
      </CardBody>
    </Card>
  );
}
