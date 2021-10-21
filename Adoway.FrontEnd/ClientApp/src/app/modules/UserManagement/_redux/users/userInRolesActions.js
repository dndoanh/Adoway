import * as requestFromServer from "./usersCrud";
import { userInRolesSlice, callTypes } from "./userInRolesSlice";

const { actions } = userInRolesSlice;

export const fetchUserInRoles = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getUserInRoles(id)
        .then(response => {
            debugger;
            const  payload = response.data;
            dispatch(actions.userInRolesFetched(payload));
        })
        .catch(error => {
            error.clientMessage = "Can't find User In Roles";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};
export const createUserInRoles = userInRolesForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createUserInRoles(userInRolesForCreation)
        .then(response => {
            const user = response.data;
            dispatch(actions.userInRolesCreated({ user }));
        })
        .catch(error => {
            error.clientMessage = "Can't create user in role";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
export const deleteUserInRoles= id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteUserInRoles(id)
        .then(response => {
            dispatch(actions.userDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete UserInRoles";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

