import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { UsersPage } from "./users/UsersPage";
import { SettingsPage } from "./settings/SettingsPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function SystemPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from system root URL to /users */
          <Redirect
            exact={true}
            from="/system"
            to="/users"
          />
        }
        <ContentRoute path="/users" component={UsersPage} />
        <ContentRoute path="/settings" component={SettingsPage} />
      </Switch>
    </Suspense>
  );
}
