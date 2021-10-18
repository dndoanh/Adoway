import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function LanguageEditDialogHeader({ id }) {
  // Languages Redux state
  const { languageForEdit, actionsLoading } = useSelector(
    (state) => ({
      languageForEdit: state.languages.languageForEdit,
      actionsLoading: state.languages.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Language";
    if (languageForEdit && id) {
      _title = `Edit language '${languageForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [languageForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
