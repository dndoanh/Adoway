import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/meetingrooms/meetingRoomsActions";
import {useMeetingRoomsUIContext} from "../MeetingRoomsUIContext";

export function MeetingRoomDeleteDialog({ id, show, onHide }) {
  // MeetingRooms UI Context
  const meetingRoomsUIContext = useMeetingRoomsUIContext();
  const meetingRoomsUIProps = useMemo(() => {
    return {
      setIds: meetingRoomsUIContext.setIds,
      queryParams: meetingRoomsUIContext.queryParams
    };
  }, [meetingRoomsUIContext]);

  // MeetingRooms Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.meetingrooms.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMeetingRoom = () => {
    // server request for deleting meetingRoom by id
    dispatch(actions.deleteMeetingRoom(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchMeetingRooms(meetingRoomsUIProps.queryParams));
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          MeetingRoom Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this meetingRoom?</span>
        )}
        {isLoading && <span>MeetingRoom is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteMeetingRoom}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
