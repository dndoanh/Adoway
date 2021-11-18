import React from "react";
import { Route } from "react-router-dom";
import { InvoicesLoadingDialog } from "./invoices-loading-dialog/InvoicesLoadingDialog";
import { InvoiceDeleteDialog } from "./invoice-delete-dialog/InvoiceDeleteDialog";
import { InvoicesUIProvider } from "./InvoicesUIContext";
import { InvoicesCard } from "./InvoicesCard";
import { InvoiceEdit } from "./invoice-edit/InvoiceEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function InvoicesPage({ history }) {
    const invoicesUIEvents = {
        newInvoiceButtonClick: () => {
            history.push("/invoices/new");
        },
        openEditInvoicePage: (id) => {
            history.push(`/invoices/${id}/edit`);
        },
        openDeleteInvoiceDialog: (id) => {
            history.push(`/invoices/${id}/delete`);
        },
       
    }

    return (
        <InvoicesUIProvider invoicesUIEvents={invoicesUIEvents}>
            <InvoicesLoadingDialog />
            <ContentRoute path="/invoices/new" component={InvoiceEdit} />
            <ContentRoute
                path="/invoices/:id/edit"
                component={InvoiceEdit}
            />
            <Route path="/invoices/:id/delete">
                {({ history, match }) => (
                    <InvoiceDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/invoices");
                        }}
                    />
                )}
            </Route>
            <InvoicesCard />
        </InvoicesUIProvider>
    );
}
