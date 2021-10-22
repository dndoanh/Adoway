import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
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

export const rootReducer = combineReducers({
    auth: auth.reducer,
    customers: customersSlice.reducer,
    products: productsSlice.reducer,
    remarks: remarksSlice.reducer,
    specifications: specificationsSlice.reducer,
    // User Management
    users: usersSlice.reducer,
    roles: rolesSlice.reducer,
    userInRoles: userInRolesSlice.reducer,
    roleInScreens: roleInScreensSlice.reducer,
    // System
    enterprises: enterprisesSlice.reducer,
    languages: languagesSlice.reducer,
});

export function* rootSaga() {
    yield all([auth.saga()]);
}
