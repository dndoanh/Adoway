import React from "react";
import { Route } from "react-router-dom";
import { EmployeesLoadingDialog } from "./employees-loading-dialog/EmployeesLoadingDialog";
import { EmployeeEditDialog } from "./employee-edit-dialog/EmployeeEditDialog";
import { EmployeeDeleteDialog } from "./employee-delete-dialog/EmployeeDeleteDialog";
import { EmployeesUIProvider } from "./EmployeesUIContext";
import { EmployeesCard } from "./EmployeesCard";

export function EmployeesPage({ history }) {
    const employeesUIEvents = {
        newEmployeeButtonClick: () => {
            history.push("/employees/new");
        },
        newEmployeeInRolesButtonClick: () => {
            history.push("/employees/new-employee-in-roles");
        },
        openEditEmployeeDialog: (id) => {
            history.push(`/employees/${id}/edit`);
        },
        openDeleteEmployeeDialog: (id) => {
            history.push(`/employees/${id}/delete`);
        }
    }

    return (
        <EmployeesUIProvider employeesUIEvents={employeesUIEvents}>
            <EmployeesLoadingDialog />
            <Route path="/employees/new">
                {({ history, match }) => (
                    <EmployeeEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/employees");
                        }}
                    />
                )}
            </Route>
            <Route path="/employees/:id/edit">
                {({ history, match }) => (
                    <EmployeeEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/employees");
                        }}
                    />
                )}
            </Route>
            <Route path="/employees/:id/delete">
                {({ history, match }) => (
                    <EmployeeDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/employees");
                        }}
                    />
                )}
            </Route>
            <EmployeesCard />
        </EmployeesUIProvider>
    );
}
