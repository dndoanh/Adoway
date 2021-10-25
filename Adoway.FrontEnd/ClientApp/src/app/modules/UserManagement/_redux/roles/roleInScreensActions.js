import * as requestFromServer from "./rolesCrud";
import { roleInScreensSlice, callTypes } from "./roleInScreensSlice";

const { actions } = roleInScreensSlice;

export const fetchRoleInScreens = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getRoleInScreens(id)
        .then(response => {
            const  payload = response.data;
            dispatch(actions.roleInScreensFetched(payload));
        })
        .catch(error => {
            error.clientMessage = "Can't find Role In Screens";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};
export const createRoleInScreens = roleInScreensForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createRoleInScreens(roleInScreensForCreation)
        .then(response => {
            const role = response.data;
            dispatch(actions.roleInScreensCreated({ role }));
        })
        .catch(error => {
            error.clientMessage = "Can't create role in screen";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
export const deleteRoleInScreens= id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteRoleInScreens(id)
        .then(response => {
            dispatch(actions.roleDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete RoleInScreens";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
export const updateRoleInScreens = roleInScreens => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateRoleInScreens(roleInScreens)
        .catch(error => {
            error.clientMessage = "Can't update user";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateRoleInScreensStatus = id => dispatch => {
    dispatch(actions.roleInScreensStatusUpdated({id}));
  
};

