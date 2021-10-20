import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/roles/rolesActions";
import { RoleEditDialogHeader } from "./RoleEditDialogHeader";
import { RoleEditForm } from "./RoleEditForm";
import { useRolesUIContext } from "../RolesUIContext";

export function RoleEditDialog({ id, show, onHide }) {
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
    dispatch(actions.selectRole(id));
  }, [id, dispatch]);

  // server request for saving role
  const saveRole = (role) => {
    if (!id) {
      // server request for creating role
      dispatch(actions.createRole(role)).then(() => onHide());
    } else {
      // server request for updating role
      dispatch(actions.updateRole(role)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RoleEditDialogHeader id={id} />
      <RoleEditForm
        saveRole={saveRole}
        actionsLoading={actionsLoading}
        role={roleForEdit || rolesUIProps.initRole}
        onHide={onHide}
      />
    </Modal>
  );
}
