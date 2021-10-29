import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EnterprisesPage } from "./modules/System/pages/enterprises/EnterprisesPage";
import { LanguagesPage } from "./modules/System/pages/languages/LanguagesPage";
import { UsersPage } from "./modules/UserManagement/pages/users/UsersPage";
import { RolesPage } from "./modules/UserManagement/pages/roles/RolesPage";
import { ApartmentsPage } from "./modules/ProjectManagement/pages/apartments/ApartmentsPage";
import { ContractsPage } from "./modules/ProjectManagement/pages/contracts/ContractsPage";
import { OwnersPage } from "./modules/ProjectManagement/pages/owners/OwnersPage";
import { TeleVendorsPage } from "./modules/ProjectManagement/pages/teleVendors/TeleVendorsPage";
import { WorkOrdersPage } from "./modules/ProjectManagement/pages/workOrders/WorkOrdersPage";
import { ProjectsPage } from "./modules/ProjectManagement/pages/projects/ProjectsPage";
import { DepartmentsPage } from "./modules/HumanResourceManagement/pages/departments/DepartmentsPage";
import { EmployeesPage } from "./modules/HumanResourceManagement/pages/employees/EmployeesPage";

const GoogleMaterialPage = lazy(() =>
    import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
    import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
    import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
    import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard" />
                }
                <ContentRoute path="/dashboard" component={DashboardPage} />
                <ContentRoute path="/builder" component={BuilderPage} />
                <ContentRoute path="/my-page" component={MyPage} />
                <Route path="/google-material" component={GoogleMaterialPage} />
                <Route path="/react-bootstrap" component={ReactBootstrapPage} />
                <Route path="/e-commerce" component={ECommercePage} />
                <Route path="/user-profile" component={UserProfilepage} />

                {/*User Management*/}
                <Route path="/users" component={UsersPage} />
                <Route path="/roles" component={RolesPage} />
                {/*Project Management*/}
                <Route path="/apartments" component={ApartmentsPage} />
                <Route path="/contracts" component={ContractsPage} />
                <Route path="/owners" component={OwnersPage} />
                <Route path="/televendors" component={TeleVendorsPage} />
                <Route path="/workorders" component={WorkOrdersPage} />
                <Route path="/projects" component={ProjectsPage} />
                {/*HR Management*/}
                <Route path="/departments" component={DepartmentsPage} />
                <Route path="/employees" component={EmployeesPage} />
                {/*System*/}
                <Route path="/enterprises" component={EnterprisesPage} />
                <Route path="/languages" component={LanguagesPage} />
                {/*Common*/}
                <Redirect to="error/error-v1" />
            </Switch>
        </Suspense>
    );
}
