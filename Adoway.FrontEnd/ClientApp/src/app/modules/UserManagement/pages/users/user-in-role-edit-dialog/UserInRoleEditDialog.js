import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as userInRolesActions from "../../../_redux/users/userInRolesActions";
import * as userActions from "../../../_redux/users/usersActions";
import { UserInRoleEditDialogHeader } from "./UserInRoleEditDialogHeader";
import { UserInRoleEditForm } from "./UserInRoleEditForm";
import { useUsersUIContext } from "../UsersUIContext";

export function UserInRoleEditDialog({ id, show, onHide }) {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
    };
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
    }),
    shallowEqual
  );
  

  useEffect(() => {
    // server call for getting User by id
      dispatch(userActions.selectUser(id));
  }, [id, dispatch]);

    useEffect(() => {
        dispatch(userInRolesActions.fetchUserInRoles(id));
    }, [id, dispatch]);
  // server request for saving user
  const saveUser = (user) => {
    if (!id) {
      // server request for creating user
        dispatch(userActions.createUser(user)).then(() => onHide());
    } else {
      // server request for updating user
        dispatch(userActions.updateUser(user)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserInRoleEditDialogHeader id={id} />
      <UserInRoleEditForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
