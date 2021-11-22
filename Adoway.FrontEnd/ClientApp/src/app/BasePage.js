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
import { OwnersPage } from "./modules/ProjectManagement/pages/owners/OwnersPage";
import { WorkOrdersPage } from "./modules/ProjectManagement/pages/workorders/WorkOrdersPage";
import { ProjectsPage } from "./modules/ProjectManagement/pages/projects/ProjectsPage";
import { SubscriptionsPage } from "./modules/SalesManagement/pages/subscriptions/SubscriptionsPage";
import { CustomersPage } from "./modules/SalesManagement/pages/customers/CustomersPage";
import { SuppliersPage } from "./modules/PurchaseManagement/pages/suppliers/SuppliersPage";
import { ProductsPage } from "./modules/InventoryManagement/pages/products/ProductsPage";
import { CategoriesPage } from "./modules/InventoryManagement/pages/categories/CategoriesPage";
import { MeetingRoomsPage } from "./modules/Calendar/pages/meetingrooms/MeetingRoomsPage";
import {EventsPage } from "./modules/Calendar/pages/events/EventsPage";
import { InvoicesPage } from "./modules/SalesManagement/pages/invoices/InvoicesPage";
import { PaymentRequestsPage } from "./modules/Payment/page/payment-request/PaymentRequestsPage";

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
                <Route path="/owners" component={OwnersPage} />
                <Route path="/workorders" component={WorkOrdersPage} />

                <Route path="/projects" component={ProjectsPage} />
                {/*Sale*/}
                <Route path="/subscriptions" component={SubscriptionsPage} />
                <Route path="/customers" component={CustomersPage} />
                {/*Sale*/}
                <Route path="/subscriptions" component={SubscriptionsPage} />
                <Route path="/customers" component={CustomersPage} />
                {/*Purchase*/}
                <Route path="/suppliers" component={SuppliersPage} />
                {/*Inventory*/}
                <Route path="/products" component={ProductsPage} />
                <Route path="/categories" component={CategoriesPage} />
                {/*System*/}
                <Route path="/enterprises" component={EnterprisesPage} />
                <Route path="/languages" component={LanguagesPage} />
                {/*Common*/}
           {/*     <Redirect to="error/error-v1" />*/}
             

                <Route path="/meetingrooms" component={MeetingRoomsPage} />
                <Route path="/events" component={EventsPage} />

                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/paymentrequests" component={PaymentRequestsPage} />
                
            </Switch>
        </Suspense>
    );
}
