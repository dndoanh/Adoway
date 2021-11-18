import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function MeetingRoomEditDialogHeader({ id }) {
  // MeetingRooms Redux state
  const { meetingRoomForEdit, actionsLoading } = useSelector(
    (state) => ({
      meetingRoomForEdit: state.meetingrooms.meetingRoomForEdit,
      actionsLoading: state.meetingrooms.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New MeetingRoom";
    if (meetingRoomForEdit && id) {
      _title = `Edit Meeting Room '${meetingRoomForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [meetingRoomForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
