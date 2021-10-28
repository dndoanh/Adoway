import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ContractEditDialogHeader({ id }) {
  // Contracts Redux state
  const { contractForEdit, actionsLoading } = useSelector(
    (state) => ({
      contractForEdit: state.contracts.contractForEdit,
      actionsLoading: state.contracts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Contract";
    if (contractForEdit && id) {
      _title = `Edit contract '${contractForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [contractForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
