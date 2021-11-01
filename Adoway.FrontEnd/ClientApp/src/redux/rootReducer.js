import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
// User Management
import { usersSlice } from "../app/modules/UserManagement/_redux/users/usersSlice";
import { userInRolesSlice } from "../app/modules/UserManagement/_redux/users/userInRolesSlice";
import { roleInScreensSlice } from "../app/modules/UserManagement/_redux/roles/roleInScreensSlice";
import { rolesSlice } from "../app/modules/UserManagement/_redux/roles/rolesSlice";
// System
import { enterprisesSlice } from "../app/modules/System/_redux/enterprises/enterprisesSlice";
import { languagesSlice } from "../app/modules/System/_redux/languages/languagesSlice";
// Project Management
import { apartmentsSlice } from "../app/modules/ProjectManagement/_redux/apartments/apartmentsSlice";
import { contractsSlice } from "../app/modules/ProjectManagement/_redux/contracts/contractsSlice";
import { ownersSlice } from "../app/modules/ProjectManagement/_redux/owners/ownersSlice";
import { teleVendorsSlice } from "../app/modules/ProjectManagement/_redux/teleVendors/teleVendorsSlice";
import { workOrdersSlice } from "../app/modules/ProjectManagement/_redux/workorders/workOrdersSlice";
import { projectsSlice } from "../app/modules/ProjectManagement/_redux/projects/projectsSlice";
// Sales
import { subscriptionsSlice } from "../app/modules/SalesManagement/_redux/subscriptions/subscriptionsSlice";
import { customersSlice } from "../app/modules/SalesManagement/_redux/customers/customersSlice";
//Purchase
import { suppliersSlice } from "../app/modules/PurchaseManagement/_redux/suppliers/suppliersSlice";
//Inventory
import { productsSlice } from "../app/modules/InventoryManagement/_redux/products/productsSlice";
import { categoriesSlice } from "../app/modules/InventoryManagement/_redux/categories/categoriesSlice";

export const rootReducer = combineReducers({
    auth: auth.reducer,
  /*  products: productsSlice.reducer,*/
    remarks: remarksSlice.reducer,
    specifications: specificationsSlice.reducer,
    // User Management
    users: usersSlice.reducer,
    roles: rolesSlice.reducer,
    userInRoles: userInRolesSlice.reducer,
    roleInScreens: roleInScreensSlice.reducer,
    // Project Management
    apartments: apartmentsSlice.reducer,
    contracts: contractsSlice.reducer,
    owners: ownersSlice.reducer,
    teleVendors: teleVendorsSlice.reducer,
    projects: projectsSlice.reducer,
    // Sales
    subscriptions:  subscriptionsSlice.reducer,
    customers: customersSlice.reducer,
    // Purchase
    suppliers: suppliersSlice.reducer,
    // Inventory
    products: productsSlice.reducer,
    categories:  categoriesSlice.reducer,
    // System
    enterprises: enterprisesSlice.reducer,
    languages: languagesSlice.reducer,
});

export function* rootSaga() {
    yield all([auth.saga()]);
}
