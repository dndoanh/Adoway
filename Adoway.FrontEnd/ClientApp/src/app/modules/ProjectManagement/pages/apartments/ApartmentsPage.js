import React from "react";
import { Route } from "react-router-dom";
import { ApartmentsLoadingDialog } from "./apartments-loading-dialog/ApartmentsLoadingDialog";
import { ApartmentEditDialog } from "./apartment-edit-dialog/ApartmentEditDialog";
import { ApartmentDeleteDialog } from "./apartment-delete-dialog/ApartmentDeleteDialog";
import { ApartmentsUIProvider } from "./ApartmentsUIContext";
import { ApartmentsCard } from "./ApartmentsCard";

export function ApartmentsPage({ history }) {
    const apartmentsUIEvents = {
        newApartmentButtonClick: () => {
            history.push("/apartments/new");
        },
        newApartmentInRolesButtonClick: () => {
            history.push("/apartments/new-apartment-in-roles");
        },
        openEditApartmentDialog: (id) => {
            history.push(`/apartments/${id}/edit`);
        },
        openEditApartmentInRoleDialog: (id) => {
            history.push(`/apartments/${id}/edit-role`);
        },
        openDeleteApartmentDialog: (id) => {
            history.push(`/apartments/${id}/delete`);
        },
        openDeleteApartmentInRolesDialog: (id) => {
            history.push(`/apartments/${id}/delete-apartment-in-roles`);
        }
    }

    return (
        <ApartmentsUIProvider apartmentsUIEvents={apartmentsUIEvents}>
            <ApartmentsLoadingDialog />
            <Route path="/apartments/new">
                {({ history, match }) => (
                    <ApartmentEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/apartments");
                        }}
                    />
                )}
            </Route>
            <Route path="/apartments/:id/edit">
                {({ history, match }) => (
                    <ApartmentEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/apartments");
                        }}
                    />
                )}
            </Route>
            <Route path="/apartments/:id/delete">
                {({ history, match }) => (
                    <ApartmentDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/apartments");
                        }}
                    />
                )}
            </Route>
            <ApartmentsCard />
        </ApartmentsUIProvider>
    );
}
