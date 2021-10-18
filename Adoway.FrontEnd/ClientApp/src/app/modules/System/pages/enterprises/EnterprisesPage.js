import React from "react";
import { Route } from "react-router-dom";
import { EnterprisesLoadingDialog } from "./enterprises-loading-dialog/EnterprisesLoadingDialog";
import { EnterpriseEditDialog } from "./enterprise-edit-dialog/EnterpriseEditDialog";
import { EnterpriseDeleteDialog } from "./enterprise-delete-dialog/EnterpriseDeleteDialog";
import { EnterprisesUIProvider } from "./EnterprisesUIContext";
import { EnterprisesCard } from "./EnterprisesCard";

export function EnterprisesPage({ history }) {
  const enterprisesUIEvents = {
    newEnterpriseButtonClick: () => {
      history.push("/enterprises/new");
    },
    openEditEnterpriseDialog: (id) => {
      history.push(`/enterprises/${id}/edit`);
    },
    openDeleteEnterpriseDialog: (id) => {
      history.push(`/enterprises/${id}/delete`);
    }
  }

  return (
    <EnterprisesUIProvider enterprisesUIEvents={enterprisesUIEvents}>
      <EnterprisesLoadingDialog />
      <Route path="/enterprises/new">
        {({ history, match }) => (
          <EnterpriseEditDialog
            show={match != null}
            onHide={() => {
              history.push("/enterprises");
            }}
          />
        )}
      </Route>
      <Route path="/enterprises/:id/edit">
        {({ history, match }) => (
          <EnterpriseEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/enterprises");
            }}
          />
        )}
      </Route>
      <Route path="/enterprises/:id/delete">
        {({ history, match }) => (
          <EnterpriseDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/enterprises");
            }}
          />
        )}
      </Route>
      <EnterprisesCard />
    </EnterprisesUIProvider>
  );
}
