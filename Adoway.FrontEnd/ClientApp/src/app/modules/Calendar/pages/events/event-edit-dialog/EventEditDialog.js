import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/events/eventsActions";
import { EventEditDialogHeader } from "./EventEditDialogHeader";
import { EventEditForm } from "./EventEditForm";
import { useEventsUIContext } from "../EventsUIContext";
import moment from 'moment'

export function EventEditDialog({ id, show, onHide,start,end }) {
  // Events UI Context
  const eventsUIContext = useEventsUIContext();
  const eventsUIProps = useMemo(() => {
    return {
        initEvent: eventsUIContext.initEvent,
    };
  }, [eventsUIContext]);
  // Events Redux state
    const dispatch = useDispatch();
  const { actionsLoading, eventForEdit } = useSelector(
      (state) => ({
          actionsLoading: state.events.actionsLoading,
          eventForEdit: (state.events.eventForEdit && id) ?
              {
                  ...state.events.eventForEdit,
                  startDate: moment(state.events.eventForEdit.start).format("DD/MM/YYYY HH:mm:ss"),
                  endDate: moment(state.events.eventForEdit.end).format("DD/MM/YYYY HH:mm:ss"),
                  period: Math.abs(Date.parse(state.events.eventForEdit.end) - Date.parse(state.events.eventForEdit.start)) / 36e5,
                  //  start: state.events.eventForEdit.start,
                  //end: state.events.eventForEdit.end
              } :
              {
              ...state.events.eventForEdit,
                  title: "",
                  startDate: moment(start).format("DD/MM/YYYY HH:mm:ss"),
                  endDate: moment(end).format("DD/MM/YYYY HH:mm:ss"),
                  //period: Math.abs(Date.parse(start) - Date.parse(end)) / 36e5,
                  //allDay:false
          },
         /* eventForEdit: state.events.eventForEdit*/
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Event by id
    dispatch(actions.selectEvent(id));
  }, [id, dispatch]);

  // server request for saving event
    const saveEvent = (event) => {
    if (!id) {
      // server request for creating event
        const { id, ...eventForCreate } = event;
        const attendees = event.attendees.map(a => ({
            AttendeeId :a.value,
            AttendeeName:a.label
        }));

        dispatch(actions.createEvent({
            ...eventForCreate,
            startDate: moment(event.startDate, 'DD/MM/YYYY HH:mm:ss').toDate() ,
            endDate: moment(event.endDate, 'DD/MM/YYYY HH:mm:ss').toDate(),
            attendees: attendees
        }));
        onHide();
    } else {
      // server request for updating event
        dispatch(actions.updateEvent({
            ...event,
            start: moment(event.start, 'DD/MM/YYYY HH:mm:ss').toDate(),
            end: moment(event.end, 'DD/MM/YYYY HH:mm:ss').toDate()
        }));
        onHide();
    }
  };
    const handleDelete = (id) => {
        dispatch(actions.deleteEvent(id));
        onHide();
    }
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EventEditDialogHeader id={id} />
      <EventEditForm
        id={id}
        saveEvent={saveEvent}
        actionsLoading={actionsLoading}
        event={eventForEdit || eventsUIProps.initEvent}
        onHide={onHide}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}
