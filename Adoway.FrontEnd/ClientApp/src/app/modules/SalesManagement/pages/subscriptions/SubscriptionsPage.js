import React from "react";
import { Route } from "react-router-dom";
import { SubscriptionsLoadingDialog } from "./subscriptions-loading-dialog/SubscriptionsLoadingDialog";
import { SubscriptionEditDialog } from "./subscription-edit-dialog/SubscriptionEditDialog";
import { SubscriptionDeleteDialog } from "./subscription-delete-dialog/SubscriptionDeleteDialog";
import { SubscriptionsUIProvider } from "./SubscriptionsUIContext";
import { SubscriptionsCard } from "./SubscriptionsCard";

export function SubscriptionsPage({ history }) {
    const subscriptionsUIEvents = {
        newSubscriptionButtonClick: () => {
            history.push("/subscriptions/new");
        },
        newSubscriptionInRolesButtonClick: () => {
            history.push("/subscriptions/new-subscription-in-roles");
        },
        openEditSubscriptionDialog: (id) => {
            history.push(`/subscriptions/${id}/edit`);
        },
        openEditSubscriptionInRoleDialog: (id) => {
            history.push(`/subscriptions/${id}/edit-role`);
        },
        openDeleteSubscriptionDialog: (id) => {
            history.push(`/subscriptions/${id}/delete`);
        },
        openDeleteSubscriptionInRolesDialog: (id) => {
            history.push(`/subscriptions/${id}/delete-subscription-in-roles`);
        }
    }

    return (
        <SubscriptionsUIProvider subscriptionsUIEvents={subscriptionsUIEvents}>
            <SubscriptionsLoadingDialog />
            <Route path="/subscriptions/new">
                {({ history, match }) => (
                    <SubscriptionEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/subscriptions");
                        }}
                    />
                )}
            </Route>
            <Route path="/subscriptions/:id/edit">
                {({ history, match }) => (
                    <SubscriptionEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/subscriptions");
                        }}
                    />
                )}
            </Route>
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
