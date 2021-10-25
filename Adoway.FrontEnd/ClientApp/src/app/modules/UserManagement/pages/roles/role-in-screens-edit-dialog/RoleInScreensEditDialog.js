import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as roleInScreensActions from "../../../_redux/roles/roleInScreensActions";
import * as roleActions from "../../../_redux/roles/rolesActions";
import { RoleInScreensEditDialogHeader } from "./RoleInScreensEditDialogHeader";
import { RoleInScreensEditForm } from "./RoleInScreensEditForm";
import { useRolesUIContext } from "../RolesUIContext";

export function RoleInScreensEditDialog({ id, show, onHide }) {
  // Roles UI Context
  const rolesUIContext = useRolesUIContext();
  const rolesUIProps = useMemo(() => {
    return {
      initRole: rolesUIContext.initRole,
    };
  }, [rolesUIContext]);

  // Roles Redux state
  const dispatch = useDispatch();
  const { actionsLoading, roleForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      roleForEdit: state.roles.roleForEdit,
    }),
    shallowEqual
  );
  

  useEffect(() => {
    // server call for getting Role by id
      dispatch(roleActions.selectRole(id));
  }, [id, dispatch]);

    useEffect(() => {
        dispatch(roleInScreensActions.fetchRoleInScreens(id));
    }, [id, dispatch]);
  // server request for saving role
    const saveRole = (roleInScreens) => {
      // server request for creating role
        debugger;
        dispatch(roleInScreensActions.updateRoleInScreens(roleInScreens)).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RoleInScreensEditDialogHeader id={id} />
      <RoleInScreensEditForm
        saveRole={saveRole}
        actionsLoading={actionsLoading}
        role={roleForEdit || rolesUIProps.initRole}
        onHide={onHide}
      />
    </Modal>
  );
}
