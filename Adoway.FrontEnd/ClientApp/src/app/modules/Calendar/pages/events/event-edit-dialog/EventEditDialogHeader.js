import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
export function EventEditDialogHeader({ id }) {
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
    const intl = useIntl()
    const new_event = intl.formatMessage({ id: "CALENDAR.EVENTS.NEW_EVENT" })
    const edit_event = intl.formatMessage({ id: "CALENDAR.EVENTS.EDIT_EVENT" })
  useEffect(() => {
      let _title = id ? "" : new_event;
      if (eventForEdit && id) {
          _title = `${edit_event} '${eventForEdit.title}'`;
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
