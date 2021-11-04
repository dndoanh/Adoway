import * as requestFromServer from "./usersCrud";
import {usersSlice, callTypes} from "./usersSlice";

const {actions} = usersSlice;

export const fetchUsers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUsers(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.usersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAllUsers = dispatch => {
    return requestFromServer
        .getAllUsers()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allUsersFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};

export const selectUser = id => dispatch => {
    dispatch(actions.userSelected({ id: id }));
};

export const createUser = userForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUser(userForCreation)
    .then(response => {
      const user = response.data;
      dispatch(actions.userCreated({ user }));
    })
    .catch(error => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = user => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(user)
    .then(() => {
        dispatch(actions.userUpdated({ user }));
    })
    .catch(error => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUser = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteUser(id)
        .then(response => {
            dispatch(actions.userDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete user";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};