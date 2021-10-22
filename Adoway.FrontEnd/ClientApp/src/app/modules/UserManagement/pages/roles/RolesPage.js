import React from "react";
import { Route } from "react-router-dom";
import { RolesLoadingDialog } from "./roles-loading-dialog/RolesLoadingDialog";
import { RoleEditDialog } from "./role-edit-dialog/RoleEditDialog";
import { RoleDeleteDialog } from "./role-delete-dialog/RoleDeleteDialog";
import { RoleInScreensEditDialog } from "./role-in-screens-edit-dialog/RoleInScreensEditDialog";
import { RolesUIProvider } from "./RolesUIContext";
import { RolesCard } from "./RolesCard";

export function RolesPage({ history }) {
  const rolesUIEvents = {
    newRoleButtonClick: () => {
      history.push("/roles/new");
    },
    openEditRoleDialog: (id) => {
      history.push(`/roles/${id}/edit`);
      },
      openEditRoleInScreensDialog: (id) => {
          history.push(`/roles/${id}/edit-screens`);
      },
    openDeleteRoleDialog: (id) => {
      history.push(`/roles/${id}/delete`);
    }
  }

  return (
    <RolesUIProvider rolesUIEvents={rolesUIEvents}>
      <RolesLoadingDialog />
      <Route path="/roles/new">
        {({ history, match }) => (
          <RoleEditDialog
            show={match != null}
            onHide={() => {
              history.push("/roles");
            }}
          />
        )}
      </Route>
      <Route path="/roles/:id/edit">
        {({ history, match }) => (
          <RoleEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/roles");
            }}
          />
        )}
          </Route>
          <Route path="/roles/:id/edit-screens">
              {({ history, match }) => (
                  < RoleInScreensEditDialog
                      show={match != null}
                      id={match && match.params.id}
                      onHide={() => {
                          history.push("/roles");
                      }}
                  />
              )}
          </Route>
      <Route path="/roles/:id/delete">
        {({ history, match }) => (
          <RoleDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/roles");
            }}
          />
        )}
      </Route>
      <RolesCard />
    </RolesUIProvider>
  );
}
