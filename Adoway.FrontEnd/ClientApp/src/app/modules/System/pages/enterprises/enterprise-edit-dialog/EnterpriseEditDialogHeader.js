import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function EnterpriseEditDialogHeader({ id }) {
  // Enterprises Redux state
  const { enterpriseForEdit, actionsLoading } = useSelector(
    (state) => ({
      enterpriseForEdit: state.enterprises.enterpriseForEdit,
      actionsLoading: state.enterprises.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Enterprise";
    if (enterpriseForEdit && id) {
      _title = `Edit enterprise '${enterpriseForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [enterpriseForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
