import * as requestFromServer from "./usersCrud";
import { userInRolesSlice, callTypes } from "./userInRolesSlice";

const { actions } = userInRolesSlice;

export const fetchUserInRoles = id => dispatch => {
    debugger;
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getUserInRoles(id)
        .then(response => {
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
        .catch(error => {
            error.clientMessage = "Can't create user in role";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
export const deleteUserInRoles = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteUserInRoles(id)
        .then(response => {
            dispatch(actions.userInRolesDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete UserInRoles";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

