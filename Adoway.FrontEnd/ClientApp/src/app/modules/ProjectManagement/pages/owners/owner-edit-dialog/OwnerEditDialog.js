import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/owners/ownersActions";
import { OwnerEditDialogHeader } from "./OwnerEditDialogHeader";
import { OwnerEditForm } from "./OwnerEditForm";
import { useOwnersUIContext } from "../OwnersUIContext";

export function OwnerEditDialog({ id, show, onHide }) {
  // Owners UI Context
  const ownersUIContext = useOwnersUIContext();
  const ownersUIProps = useMemo(() => {
    return {
      initOwner: ownersUIContext.initOwner,
    };
  }, [ownersUIContext]);

  // Owners Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ownerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.owners.actionsLoading,
      ownerForEdit: state.owners.ownerForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Owner by id
    dispatch(actions.selectOwner(id));
  }, [id, dispatch]);

  // server request for saving owner
  const saveOwner = (owner) => {
    if (!id) {
      // server request for creating owner
      dispatch(actions.createOwner(owner)).then(() => onHide());
    } else {
      // server request for updating owner
      dispatch(actions.updateOwner(owner)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <OwnerEditDialogHeader id={id} />
      <OwnerEditForm
        saveOwner={saveOwner}
        actionsLoading={actionsLoading}
        owner={ownerForEdit || ownersUIProps.initOwner}
        onHide={onHide}
      />
    </Modal>
  );
}
