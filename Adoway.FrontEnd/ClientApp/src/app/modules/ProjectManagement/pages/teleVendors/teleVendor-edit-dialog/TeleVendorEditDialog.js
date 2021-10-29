import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/teleVendors/teleVendorsActions";
import { TeleVendorEditDialogHeader } from "./TeleVendorEditDialogHeader";
import { TeleVendorEditForm } from "./TeleVendorEditForm";
import { useTeleVendorsUIContext } from "../TeleVendorsUIContext";

export function TeleVendorEditDialog({ id, show, onHide }) {
  // TeleVendors UI Context
  const teleVendorsUIContext = useTeleVendorsUIContext();
  const teleVendorsUIProps = useMemo(() => {
    return {
      initTeleVendor: teleVendorsUIContext.initTeleVendor,
    };
  }, [teleVendorsUIContext]);

  // TeleVendors Redux state
  const dispatch = useDispatch();
  const { actionsLoading, teleVendorForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.teleVendors.actionsLoading,
      teleVendorForEdit: state.teleVendors.teleVendorForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting TeleVendor by id
    dispatch(actions.selectTeleVendor(id));
  }, [id, dispatch]);

  // server request for saving teleVendor
  const saveTeleVendor = (teleVendor) => {
    if (!id) {
      // server request for creating teleVendor
      dispatch(actions.createTeleVendor(teleVendor)).then(() => onHide());
    } else {
      // server request for updating teleVendor
      dispatch(actions.updateTeleVendor(teleVendor)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TeleVendorEditDialogHeader id={id} />
      <TeleVendorEditForm
        saveTeleVendor={saveTeleVendor}
        actionsLoading={actionsLoading}
        teleVendor={teleVendorForEdit || teleVendorsUIProps.initTeleVendor}
        onHide={onHide}
      />
    </Modal>
  );
}
