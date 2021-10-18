import React from "react";
import { Route } from "react-router-dom";
import { LanguagesLoadingDialog } from "./languages-loading-dialog/LanguagesLoadingDialog";
import { LanguageEditDialog } from "./language-edit-dialog/LanguageEditDialog";
import { LanguageDeleteDialog } from "./language-delete-dialog/LanguageDeleteDialog";
import { LanguagesUIProvider } from "./LanguagesUIContext";
import { LanguagesCard } from "./LanguagesCard";

export function LanguagesPage({ history }) {
  const languagesUIEvents = {
    newLanguageButtonClick: () => {
      history.push("/languages/new");
    },
    openEditLanguageDialog: (id) => {
      history.push(`/languages/${id}/edit`);
    },
    openDeleteLanguageDialog: (id) => {
      history.push(`/languages/${id}/delete`);
    }
  }

  return (
    <LanguagesUIProvider languagesUIEvents={languagesUIEvents}>
      <LanguagesLoadingDialog />
      <Route path="/languages/new">
        {({ history, match }) => (
          <LanguageEditDialog
            show={match != null}
            onHide={() => {
              history.push("/languages");
            }}
          />
        )}
      </Route>
      <Route path="/languages/:id/edit">
        {({ history, match }) => (
          <LanguageEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/languages");
            }}
          />
        )}
      </Route>
      <Route path="/languages/:id/delete">
        {({ history, match }) => (
          <LanguageDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/languages");
            }}
          />
        )}
      </Route>
      <LanguagesCard />
    </LanguagesUIProvider>
  );
}
