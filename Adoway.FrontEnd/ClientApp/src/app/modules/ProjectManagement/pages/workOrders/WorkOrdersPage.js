import React from "react";
import { Route } from "react-router-dom";
import { WorkOrdersLoadingDialog } from "./workOrders-loading-dialog/WorkOrdersLoadingDialog";
import { WorkOrderEditDialog } from "./workOrder-edit-dialog/WorkOrderEditDialog";
import { WorkOrderDeleteDialog } from "./workOrder-delete-dialog/WorkOrderDeleteDialog";
import { WorkOrdersUIProvider } from "./WorkOrdersUIContext";
import { WorkOrdersCard } from "./WorkOrdersCard";

export function WorkOrdersPage({ history }) {
    const workOrdersUIEvents = {
        newWorkOrderButtonClick: () => {
            history.push("/workOrders/new");
        },
        newWorkOrderInRolesButtonClick: () => {
            history.push("/workOrders/new-workOrder-in-roles");
        },
        openEditWorkOrderDialog: (id) => {
            history.push(`/workOrders/${id}/edit`);
        },
        openEditWorkOrderInRoleDialog: (id) => {
            history.push(`/workOrders/${id}/edit-role`);
        },
        openDeleteWorkOrderDialog: (id) => {
            history.push(`/workOrders/${id}/delete`);
        },
        openDeleteWorkOrderInRolesDialog: (id) => {
            history.push(`/workOrders/${id}/delete-workOrder-in-roles`);
        }
    }

    return (
        <WorkOrdersUIProvider workOrdersUIEvents={workOrdersUIEvents}>
            <WorkOrdersLoadingDialog />
            <Route path="/workOrders/new">
                {({ history, match }) => (
                    <WorkOrderEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/workOrders");
                        }}
                    />
                )}
            </Route>
            <Route path="/workOrders/:id/edit">
                {({ history, match }) => (
                    <WorkOrderEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/workOrders");
                        }}
                    />
                )}
            </Route>
            <Route path="/workOrders/:id/delete">
                {({ history, match }) => (
                    <WorkOrderDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/workOrders");
                        }}
                    />
                )}
            </Route>
            <WorkOrdersCard />
        </WorkOrdersUIProvider>
    );
}
