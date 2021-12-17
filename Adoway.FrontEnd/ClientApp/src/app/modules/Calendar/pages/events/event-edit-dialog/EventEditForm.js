// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    MutiSelect,
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

// Validation schema
const EventEditSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Title is required"),
});

export function EventEditForm({
    id,
    saveEvent,
    event,
    actionsLoading,
    onHide,
    handleDelete
}) {
    const { currentUsersState } = useSelector(
        (state) => ({ currentUsersState: state.users }),
        shallowEqual
    );
    const { allUsers } = currentUsersState;

    const { currentRoomsState } = useSelector(
        (state) => ({ currentRoomsState: state.meetingrooms }),
        shallowEqual
    );
    const { allMeetingRooms } = currentRoomsState;
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const Delete = user.functions.find(x => x.code == "DeleteEvent")
    const intl = useIntl()
    const title = intl.formatMessage({ id: "TITLE.TITLE" })
    const attendees = intl.formatMessage({ id: "TITLE.ATTENDEES" })
    const startDate = intl.formatMessage({ id: "TITLE.START_DATE" })
    const endDate = intl.formatMessage({ id: "TITLE.END_DATE" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const rooms = intl.formatMessage({ id: "TITLE.MEETING_ROOMS" })
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={event}
                validationSchema={EventEditSchema}
                onSubmit={(values) => {
                    saveEvent(values);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success" />
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="title"
                                            component={Input}
                                            placeholder={title}
                                            label={title}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <MutiSelect
                                            name="attendees"
                                            label={attendees}
                                            options={allUsers && allUsers.map((user) => ({
                                                value: user.id,
                                                label: user.name
                                            }))}
                                            values={allUsers && allUsers.filter(x => event.attendeeIds?.toLowerCase().includes(x.id?.toLowerCase())).map((user) => ({
                                                value: user.id,
                                                label: user.name
                                            }))}
                                        />
                                    </div>
                                </div>
                             
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Field
                                            name="startDate"
                                            component={Input}
                                            placeholder={startDate}
                                            label={startDate}
                                        />
                                    </div>
                               
                                    <div className="col-lg-6">
                                        <Field
                                            name="endDate"
                                            component={Input}
                                            placeholder={endDate}
                                            label={endDate}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Select name="Status" label={status}>
                                            <option value="1">Draft</option>
                                            <option value="2">Confirm</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-6">
                                        <Select name="meetingRoomId" label={rooms }>
                                            <option value=""></option>
                                            {allMeetingRooms && allMeetingRooms.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <label>
                                            <FormattedMessage
                                                id="TITLE.DESCRIPTION"
                                            />
                                        </label>
                                    <Field
                                        name="description"
                                        label="Description"
                                        as="textarea"
                                        className="form-control"
                                        component="textarea"
                                        rows="4"
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                <FormattedMessage id="COMMON.CANCEL" />
                            </button>
                    
                            <> </>
                            {id && Delete && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(event.id)}
                                    className="btn btn-danger btn-elevate"
                                >
                                    <FormattedMessage id="COMMON.DELETE"/>
                                </button>
                                )
                            }
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                <FormattedMessage id="COMMON.SAVE" />
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
