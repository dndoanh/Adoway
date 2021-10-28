import React from "react";
import { Route } from "react-router-dom";
import { OwnersLoadingDialog } from "./owners-loading-dialog/OwnersLoadingDialog";
import { OwnerEditDialog } from "./owner-edit-dialog/OwnerEditDialog";
import { OwnerDeleteDialog } from "./owner-delete-dialog/OwnerDeleteDialog";
import { OwnersUIProvider } from "./OwnersUIContext";
import { OwnersCard } from "./OwnersCard";

export function OwnersPage({ history }) {
    const ownersUIEvents = {
        newOwnerButtonClick: () => {
            history.push("/owners/new");
        },
        newOwnerInRolesButtonClick: () => {
            history.push("/owners/new-owner-in-roles");
        },
        openEditOwnerDialog: (id) => {
            history.push(`/owners/${id}/edit`);
        },
        openEditOwnerInRoleDialog: (id) => {
            history.push(`/owners/${id}/edit-role`);
        },
        openDeleteOwnerDialog: (id) => {
            history.push(`/owners/${id}/delete`);
        },
        openDeleteOwnerInRolesDialog: (id) => {
            history.push(`/owners/${id}/delete-owner-in-roles`);
        }
    }

    return (
        <OwnersUIProvider ownersUIEvents={ownersUIEvents}>
            <OwnersLoadingDialog />
            <Route path="/owners/new">
                {({ history, match }) => (
                    <OwnerEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/owners");
                        }}
                    />
                )}
            </Route>
            <Route path="/owners/:id/edit">
                {({ history, match }) => (
                    <OwnerEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/owners");
                        }}
                    />
                )}
            </Route>
            <Route path="/owners/:id/delete">
                {({ history, match }) => (
                    <OwnerDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/owners");
                        }}
                    />
                )}
            </Route>
            <OwnersCard />
        </OwnersUIProvider>
    );
}
