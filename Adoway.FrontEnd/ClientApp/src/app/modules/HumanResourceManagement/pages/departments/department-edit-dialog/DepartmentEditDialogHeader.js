import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DepartmentEditDialogHeader({ id }) {
  // Departments Redux state
  const { departmentForEdit, actionsLoading } = useSelector(
    (state) => ({
      departmentForEdit: state.departments.departmentForEdit,
      actionsLoading: state.departments.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Department";
    if (departmentForEdit && id) {
      _title = `Edit department '${departmentForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [departmentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
