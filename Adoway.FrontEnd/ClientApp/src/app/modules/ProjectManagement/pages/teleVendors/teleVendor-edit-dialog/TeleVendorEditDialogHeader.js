import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function TeleVendorEditDialogHeader({ id }) {
  // TeleVendors Redux state
  const { teleVendorForEdit, actionsLoading } = useSelector(
    (state) => ({
      teleVendorForEdit: state.teleVendors.teleVendorForEdit,
      actionsLoading: state.teleVendors.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New TeleVendor";
    if (teleVendorForEdit && id) {
      _title = `Edit teleVendor '${teleVendorForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [teleVendorForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
