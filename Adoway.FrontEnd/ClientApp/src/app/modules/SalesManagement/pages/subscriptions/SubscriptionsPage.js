import React from "react";
import { Route } from "react-router-dom";
import { SubscriptionsLoadingDialog } from "./subscriptions-loading-dialog/SubscriptionsLoadingDialog";
import { SubscriptionDeleteDialog } from "./subscription-delete-dialog/SubscriptionDeleteDialog";
import { SubscriptionsUIProvider } from "./SubscriptionsUIContext";
import { SubscriptionsCard } from "./SubscriptionsCard";
import { SubscriptionEdit } from "./subscription-edit/SubscriptionEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function SubscriptionsPage({ history }) {
    const subscriptionsUIEvents = {
        newSubscriptionButtonClick: () => {
            history.push("/subscriptions/new");
        },
        openEditSubscriptionPage: (id) => {
            history.push(`/subscriptions/${id}/edit`);
        },
        openDeleteSubscriptionDialog: (id) => {
            history.push(`/subscriptions/${id}/delete`);
        },
       
    }

    return (
        <SubscriptionsUIProvider subscriptionsUIEvents={subscriptionsUIEvents}>
            <SubscriptionsLoadingDialog />
            <ContentRoute path="/subscriptions/new" component={SubscriptionEdit} />
            <ContentRoute
                path="/subscriptions/:id/edit"
                component={SubscriptionEdit}
            />
            <Route path="/subscriptions/:id/delete">
                {({ history, match }) => (
                    <SubscriptionDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/subscriptions");
                        }}
                    />
                )}
            </Route>
            <SubscriptionsCard />
        </SubscriptionsUIProvider>
    );
}
