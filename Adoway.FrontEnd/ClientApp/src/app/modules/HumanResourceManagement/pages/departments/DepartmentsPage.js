import React from "react";
import { Route } from "react-router-dom";
import { DepartmentsLoadingDialog } from "./departments-loading-dialog/DepartmentsLoadingDialog";
import { DepartmentEditDialog } from "./department-edit-dialog/DepartmentEditDialog";
import { DepartmentDeleteDialog } from "./department-delete-dialog/DepartmentDeleteDialog";
import { DepartmentsUIProvider } from "./DepartmentsUIContext";
import { DepartmentsCard } from "./DepartmentsCard";

export function DepartmentsPage({ history }) {
    const departmentsUIEvents = {
        newDepartmentButtonClick: () => {
            history.push("/departments/new");
        },
        newDepartmentInRolesButtonClick: () => {
            history.push("/departments/new-department-in-roles");
        },
        openEditDepartmentDialog: (id) => {
            history.push(`/departments/${id}/edit`);
        },
        openEditDepartmentInRoleDialog: (id) => {
            history.push(`/departments/${id}/edit-role`);
        },
        openDeleteDepartmentDialog: (id) => {
            history.push(`/departments/${id}/delete`);
        },
        openDeleteDepartmentInRolesDialog: (id) => {
            history.push(`/departments/${id}/delete-department-in-roles`);
        }
    }

    return (
        <DepartmentsUIProvider departmentsUIEvents={departmentsUIEvents}>
            <DepartmentsLoadingDialog />
            <Route path="/departments/new">
                {({ history, match }) => (
                    <DepartmentEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/departments");
                        }}
                    />
                )}
            </Route>
            <Route path="/departments/:id/edit">
                {({ history, match }) => (
                    <DepartmentEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/departments");
                        }}
                    />
                )}
            </Route>
            <Route path="/departments/:id/delete">
                {({ history, match }) => (
                    <DepartmentDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/departments");
                        }}
                    />
                )}
            </Route>
            <DepartmentsCard />
        </DepartmentsUIProvider>
    );
}
