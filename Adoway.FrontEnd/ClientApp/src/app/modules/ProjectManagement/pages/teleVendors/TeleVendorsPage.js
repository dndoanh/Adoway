import React from "react";
import { Route } from "react-router-dom";
import { TeleVendorsLoadingDialog } from "./teleVendor-loading-dialog/TeleVendorsLoadingDialog";
import { TeleVendorEditDialog } from "./teleVendor-edit-dialog/TeleVendorEditDialog";
import { TeleVendorDeleteDialog } from "./teleVendor-delete-dialog/TeleVendorDeleteDialog";
import { TeleVendorsUIProvider } from "./TeleVendorsUIContext";
import { TeleVendorsCard } from "./TeleVendorsCard";

export function TeleVendorsPage({ history }) {
    const teleVendorsUIEvents = {
        newTeleVendorButtonClick: () => {
            history.push("/teleVendors/new");
        },
        newTeleVendorInRolesButtonClick: () => {
            history.push("/teleVendors/new-teleVendor-in-roles");
        },
        openEditTeleVendorDialog: (id) => {
            history.push(`/teleVendors/${id}/edit`);
        },
        openEditTeleVendorInRoleDialog: (id) => {
            history.push(`/teleVendors/${id}/edit-role`);
        },
        openDeleteTeleVendorDialog: (id) => {
            history.push(`/teleVendors/${id}/delete`);
        },
        openDeleteTeleVendorInRolesDialog: (id) => {
            history.push(`/teleVendors/${id}/delete-teleVendor-in-roles`);
        }
    }

    return (
        <TeleVendorsUIProvider teleVendorsUIEvents={teleVendorsUIEvents}>
            <TeleVendorsLoadingDialog />
            <Route path="/teleVendors/new">
                {({ history, match }) => (
                    <TeleVendorEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/teleVendors");
                        }}
                    />
                )}
            </Route>
            <Route path="/teleVendors/:id/edit">
                {({ history, match }) => (
                    <TeleVendorEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/teleVendors");
                        }}
                    />
                )}
            </Route>
            <Route path="/teleVendors/:id/delete">
                {({ history, match }) => (
                    <TeleVendorDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/teleVendors");
                        }}
                    />
                )}
            </Route>
            <TeleVendorsCard />
        </TeleVendorsUIProvider>
    );
}
