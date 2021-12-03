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
            history.push("/work-orders/new");
        },
        openEditWorkOrderPage: (id) => {
            history.push(`/work-orders/${id}/edit`);
        },
        openDeleteWorkOrderDialog: (id) => {
            history.push(`/work-orders/${id}/delete`);
        },
       
    }

    return (
        <WorkOrdersUIProvider workOrdersUIEvents={workOrdersUIEvents}>
            <WorkOrdersLoadingDialog />
            <ContentRoute path="/work-orders/new" component={WorkOrderEdit} />
            <ContentRoute
                path="/work-orders/:id/edit"
                component={WorkOrderEdit}
            />
            <Route path="/work-orders/:id/delete">
                {({ history, match }) => (
                    <WorkOrderDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/work-orders");
                        }}
                    />
                )}
            </Route>
            <WorkOrdersCard />
        </WorkOrdersUIProvider>
    );
}
