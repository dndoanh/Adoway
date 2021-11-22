import React from "react";
import { Route } from "react-router-dom";
import { PaymentsLoadingDialog } from "./payments-loading-dialog/PaymentsLoadingDialog";
import { PaymentDeleteDialog } from "./payment-delete-dialog/PaymentDeleteDialog";
import { PaymentsUIProvider } from "./PaymentsUIContext";
import { PaymentsCard } from "./PaymentsCard";
import { PaymentEdit } from "./payment-edit/PaymentEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function PaymentsPage({ history }) {
    const paymentsUIEvents = {
        newPaymentButtonClick: () => {
            history.push("/payments/new");
        },
        openEditPaymentPage: (id) => {
            history.push(`/payments/${id}/edit`);
        },
        openDeletePaymentDialog: (id) => {
            history.push(`/payments/${id}/delete`);
        },
       
    }

    return (
        <PaymentsUIProvider paymentsUIEvents={paymentsUIEvents}>
            <PaymentsLoadingDialog />
            <ContentRoute path="/payments/new" component={PaymentEdit} />
            <ContentRoute
                path="/payments/:id/edit"
                component={PaymentEdit}
            />
            <Route path="/payments/:id/delete">
                {({ history, match }) => (
                    <PaymentDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/payments");
                        }}
                    />
                )}
            </Route>
            <PaymentsCard />
        </PaymentsUIProvider>
    );
}
