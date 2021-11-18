import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function EventDetailDialogHeader({ id }) {
  // Events Redux state
  const { eventForEdit, actionsLoading } = useSelector(
    (state) => ({
      eventForEdit: state.events.eventForEdit,
      actionsLoading: state.events.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Event";
      if (eventForEdit && id) {
          _title = `Detail Event '${eventForEdit.title}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [eventForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
