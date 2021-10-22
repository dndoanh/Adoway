import React from "react";
import { Route } from "react-router-dom";
import { UsersLoadingDialog } from "./users-loading-dialog/UsersLoadingDialog";
import { UserEditDialog } from "./user-edit-dialog/UserEditDialog";
import { UserInRolesDeleteDialog } from "./user-delete-dialog/UserInRolesDeleteDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersCard } from "./UsersCard";
import { UserInRoleEditDialog } from "./user-in-role-edit-dialog/UserInRoleEditDialog";

export function UsersPage({ history }) {
    const usersUIEvents = {
        newUserButtonClick: () => {
            history.push("/users/new");
        },
        newUserInRolesButtonClick: () => {
            history.push("/users/new-user-in-roles");
        },
        openEditUserDialog: (id) => {
            history.push(`/users/${id}/edit`);
        },
        openEditUserInRoleDialog: (id) => {
            history.push(`/users/${id}/edit-role`);
        },
        openDeleteUserDialog: (id) => {
            history.push(`/users/${id}/delete`);
        },
        openDeleteUserInRolesDialog: (id) => {
            history.push(`/users/${id}/delete-user-in-roles`);
        }
    }

    return (
        <UsersUIProvider usersUIEvents={usersUIEvents}>
            <UsersLoadingDialog />
            <Route path="/users/new">
                {({ history, match }) => (
                    <UserEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/users");
                        }}
                    />
                )}
            </Route>
            <Route path="/users/:id/edit">
                {({ history, match }) => (
                    <UserEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/users");
                        }}
                    />
                )}
            </Route>
            <Route path="/users/:id/edit-role">
                {({ history, match }) => (
                    <UserInRoleEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/users");
                        }}
                    />
                )}
            </Route>
            <Route path="/users/:id/delete">
                {({ history, match }) => (
                    <UserDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/users");
                        }}
                    />
                )}
            </Route>
            <Route path="/users/:id/delete-user-in-roles">
                {({ history, match }) => (
                    <UserInRolesDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/users");
                        }}
                    />
                )}
            </Route>
            <UsersCard />
        </UsersUIProvider>
    );
}
