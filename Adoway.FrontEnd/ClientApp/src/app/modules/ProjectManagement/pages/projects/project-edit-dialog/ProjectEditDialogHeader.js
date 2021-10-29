import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ProjectEditDialogHeader({ id }) {
  // Projects Redux state
  const { projectForEdit, actionsLoading } = useSelector(
    (state) => ({
      projectForEdit: state.projects.projectForEdit,
      actionsLoading: state.projects.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Project";
    if (projectForEdit && id) {
      _title = `Edit project '${projectForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [projectForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
