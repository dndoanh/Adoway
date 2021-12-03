import React from "react";
import { Route } from "react-router-dom";
import { PaymentRequestsLoadingDialog } from "./payment-requests-loading-dialog/PaymentRequestsLoadingDialog";
import { PaymentRequestDeleteDialog } from "./payment-request-delete-dialog/PaymentRequestDeleteDialog";
import { PaymentRequestsUIProvider } from "./PaymentRequestsUIContext";
import { PaymentRequestsCard } from "./PaymentRequestsCard";
import { PaymentRequestEdit } from "./payment-request-edit/PaymentRequestEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function PaymentRequestsPage({ history }) {
    const paymentRequestsUIEvents = {
        newPaymentRequestButtonClick: () => {
            history.push("/payment-requests/new");
        },
        openEditPaymentRequestPage: (id) => {
            history.push(`/payment-requests/${id}/edit`);
        },
        openDeletePaymentRequestDialog: (id) => {
            history.push(`/payment-requests/${id}/delete`);
        },
    }
    return (
        <PaymentRequestsUIProvider paymentRequestsUIEvents={paymentRequestsUIEvents}>
            <PaymentRequestsLoadingDialog />
            <ContentRoute path="/payment-requests/new" component={PaymentRequestEdit} />
            <ContentRoute
                path="/payment-requests/:id/edit"
                component={PaymentRequestEdit}
            />
            <Route path="/payment-requests/:id/delete">
                {({ history, match }) => (
                    <PaymentRequestDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/payment-requests");
                        }}
                    />
                )}
            </Route>
            <PaymentRequestsCard />
        </PaymentRequestsUIProvider>
    );
}
