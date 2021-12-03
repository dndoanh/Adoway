import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetingrooms/meetingRoomsActions";
import { MeetingRoomEditDialogHeader } from "./MeetingRoomEditDialogHeader";
import { MeetingRoomEditForm } from "./MeetingRoomEditForm";
import { useMeetingRoomsUIContext } from "../MeetingRoomsUIContext";

export function MeetingRoomEditDialog({ id, show, onHide }) {
  // MeetingRooms UI Context
  const meetingRoomsUIContext = useMeetingRoomsUIContext();
  const meetingRoomsUIProps = useMemo(() => {
    return {
      initMeetingRoom: meetingRoomsUIContext.initMeetingRoom,
    };
  }, [meetingRoomsUIContext]);

  // MeetingRooms Redux state
  const dispatch = useDispatch();
  const { actionsLoading, meetingRoomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.meetingrooms.actionsLoading,
      meetingRoomForEdit: state.meetingrooms.meetingRoomForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting MeetingRoom by id
    dispatch(actions.selectMeetingRoom(id));
  }, [id, dispatch]);

  // server request for saving meetingRoom
    const saveMeetingRoom = (meetingRoom) => {
    if (!id) {
      // server request for creating meetingRoom
      dispatch(actions.createMeetingRoom(meetingRoom)).then(() => onHide());
    } else {
      // server request for updating meetingRoom
      dispatch(actions.updateMeetingRoom(meetingRoom)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <MeetingRoomEditDialogHeader id={id} />
      <MeetingRoomEditForm
        saveMeetingRoom={saveMeetingRoom}
        actionsLoading={actionsLoading}
        meetingRoom={meetingRoomForEdit || meetingRoomsUIProps.initMeetingRoom}
        onHide={onHide}
      />
    </Modal>
  );
}
