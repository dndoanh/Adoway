import React from "react";
import { Route } from "react-router-dom";
import { SuppliersLoadingDialog } from "./suppliers-loading-dialog/SuppliersLoadingDialog";
import { SupplierEditDialog } from "./supplier-edit-dialog/SupplierEditDialog";
import { SupplierDeleteDialog } from "./supplier-delete-dialog/SupplierDeleteDialog";
import { SuppliersUIProvider } from "./SuppliersUIContext";
import { SuppliersCard } from "./SuppliersCard";

export function SuppliersPage({ history }) {
    const suppliersUIEvents = {
        newSupplierButtonClick: () => {
            history.push("/suppliers/new");
        },
        openEditSupplierDialog: (id) => {
            history.push(`/suppliers/${id}/edit`);
        },
        openDeleteSupplierDialog: (id) => {
            history.push(`/suppliers/${id}/delete`);
        },
    }

    return (
        <SuppliersUIProvider suppliersUIEvents={suppliersUIEvents}>
            <SuppliersLoadingDialog />
            <Route path="/suppliers/new">
                {({ history, match }) => (
                    <SupplierEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/suppliers");
                        }}
                    />
                )}
            </Route>
            <Route path="/suppliers/:id/edit">
                {({ history, match }) => (
                    <SupplierEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/suppliers");
                        }}
                    />
                )}
            </Route>
            <Route path="/suppliers/:id/delete">
                {({ history, match }) => (
                    <SupplierDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/suppliers");
                        }}
                    />
                )}
            </Route>
            <SuppliersCard />
        </SuppliersUIProvider>
    );
}
