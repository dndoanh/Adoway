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

export function InvoicesCard() {
  const invoicesUIContext = useInvoicesUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      newInvoiceButtonClick: invoicesUIContext.newInvoiceButtonClick,
    };
  }, [invoicesUIContext]);

  return (
    <Card>
      <CardHeader title="Invoices list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={invoicesUIProps.newInvoiceButtonClick}
          >
            New Invoice
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InvoicesFilter />
        <InvoicesTable />
      </CardBody>
    </Card>
  );
}
