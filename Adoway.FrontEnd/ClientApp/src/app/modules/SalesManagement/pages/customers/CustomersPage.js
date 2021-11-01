import React from "react";
import { Route } from "react-router-dom";
import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import { CustomerEditDialog } from "./customer-edit-dialog/CustomerEditDialog";
import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
import { CustomersUIProvider } from "./CustomersUIContext";
import { CustomersCard } from "./CustomersCard";

export function CustomersPage({ history }) {
    const customersUIEvents = {
        newCustomerButtonClick: () => {
            history.push("/customers/new");
        },
        newCustomerInRolesButtonClick: () => {
            history.push("/customers/new-customer-in-roles");
        },
        openEditCustomerDialog: (id) => {
            history.push(`/customers/${id}/edit`);
        },
        openEditCustomerInRoleDialog: (id) => {
            history.push(`/customers/${id}/edit-role`);
        },
        openDeleteCustomerDialog: (id) => {
            history.push(`/customers/${id}/delete`);
        },
        openDeleteCustomerInRolesDialog: (id) => {
            history.push(`/customers/${id}/delete-customer-in-roles`);
        }
    }

    return (
        <CustomersUIProvider customersUIEvents={customersUIEvents}>
            <CustomersLoadingDialog />
            <Route path="/customers/new">
                {({ history, match }) => (
                    <CustomerEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/customers");
                        }}
                    />
                )}
            </Route>
            <Route path="/customers/:id/edit">
                {({ history, match }) => (
                    <CustomerEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/customers");
                        }}
                    />
                )}
            </Route>
            <Route path="/customers/:id/delete">
                {({ history, match }) => (
                    <CustomerDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/customers");
                        }}
                    />
                )}
            </Route>
            <CustomersCard />
        </CustomersUIProvider>
    );
}
