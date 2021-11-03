import React from "react";
import { Route } from "react-router-dom";
import { WorkOrdersLoadingDialog } from "./work-orders-loading-dialog/WorkOrdersLoadingDialog";
import { WorkOrderDeleteDialog } from "./work-order-delete-dialog/WorkOrderDeleteDialog";
import { WorkOrdersUIProvider } from "./WorkOrdersUIContext";
import { WorkOrdersCard } from "./WorkOrdersCard";
import { WorkOrderEdit } from "./work-order-edit/WorkOrderEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function WorkOrdersPage({ history }) {
    const workOrdersUIEvents = {
        newWorkOrderButtonClick: () => {
            history.push("/workorders/new");
        },
        newWorkOrderInRolesButtonClick: () => {
            history.push("/work-orders/new-workOrder-in-roles");
        },
        openEditWorkOrderDialog: (id) => {
            history.push(`/work-orders/${id}/edit`);
        },
        openEditWorkOrderInRoleDialog: (id) => {
            history.push(`/work-orders/${id}/edit-role`);
        },
        openDeleteWorkOrderDialog: (id) => {
            history.push(`/work-orders/${id}/delete`);
        },
        openDeleteWorkOrderInRolesDialog: (id) => {
            history.push(`/work-orders/${id}/delete-workOrder-in-roles`);
        }
    }

    return (
        <WorkOrdersUIProvider workOrdersUIEvents={workOrdersUIEvents}>
            <WorkOrdersLoadingDialog />
            <ContentRoute path="/workorders/new" component={WorkOrderEdit} />
            <ContentRoute
                path="/workorders/:id/edit"
                component={WorkOrderEdit}
            />
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
