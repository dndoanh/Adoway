import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function WorkOrderEditDialogHeader({ id }) {
  // WorkOrders Redux state
  const { workOrderForEdit, actionsLoading } = useSelector(
    (state) => ({
      workOrderForEdit: state.workOrders.workOrderForEdit,
      actionsLoading: state.workOrders.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New WorkOrder";
    if (workOrderForEdit && id) {
      _title = `Edit workOrder '${workOrderForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [workOrderForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
