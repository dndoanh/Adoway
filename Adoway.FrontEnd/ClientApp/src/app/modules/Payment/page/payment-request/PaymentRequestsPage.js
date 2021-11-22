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
            history.push("/paymentRequests/new");
        },
        openEditPaymentRequestPage: (id) => {
            history.push(`/paymentRequests/${id}/edit`);
        },
        openDeletePaymentRequestDialog: (id) => {
            history.push(`/paymentRequests/${id}/delete`);
        },
       
    }

    return (
        <PaymentRequestsUIProvider paymentRequestsUIEvents={paymentRequestsUIEvents}>
            <PaymentRequestsLoadingDialog />
            <ContentRoute path="/paymentRequests/new" component={PaymentRequestEdit} />
            <ContentRoute
                path="/paymentRequests/:id/edit"
                component={PaymentRequestEdit}
            />
            <Route path="/paymentRequests/:id/delete">
                {({ history, match }) => (
                    <PaymentRequestDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/paymentRequests");
                        }}
                    />
                )}
            </Route>
            <PaymentRequestsCard />
        </PaymentRequestsUIProvider>
    );
}
