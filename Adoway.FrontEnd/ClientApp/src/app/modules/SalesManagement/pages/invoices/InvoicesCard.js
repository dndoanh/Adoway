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
import { FormattedMessage, useIntl } from 'react-intl';

export function InvoicesCard() {
  const invoicesUIContext = useInvoicesUIContext();
  const invoicesUIProps = useMemo(() => {
    return {
      newInvoiceButtonClick: invoicesUIContext.newInvoiceButtonClick,
    };
  }, [invoicesUIContext]);
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddInvoice = user.functions.find(x => x.code == "CreateInvoice")
    const intl = useIntl()
    const inv_list = intl.formatMessage({ id: "SALES.INVOICES.INVOICE_LIST" })
  return (
    <Card>
    <CardHeader title={inv_list}>
        <CardHeaderToolbar>
        {
             ( user.isSuperAdmin || AddInvoice)  &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={invoicesUIProps.newInvoiceButtonClick}
            >
                <FormattedMessage
                    id="SALES.INVOICES.NEW_INVOICE"
                />
            </button>
            
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
