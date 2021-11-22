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
                                            placeholder="Title"
                                            label="Title"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <MutiSelect
                                            name="attendees"
                                            label="Attendees"
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
                                            placeholder="Start Date"
                                            label="Start Date"
                                        />
                                    </div>
                               
                                    <div className="col-lg-6">
                                        <Field
                                            name="endDate"
                                            component={Input}
                                            placeholder="End Date"
                                            label="End Date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Select name="Status" label="status">
                                            <option value="1">Draft</option>
                                            <option value="2">Confirm</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-6">
                                        <Select name="meetingRoomId" label="Meeeting Room">
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
                                        <label>Description</label>
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
                                Cancel
                            </button>
                    
                            <> </>
                            {/*{id && (*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        onClick={() => handleDelete(event.id)}*/}
                            {/*        className="btn btn-danger btn-elevate"*/}
                            {/*    >*/}
                            {/*        Delete*/}
                            {/*    </button>*/}
                            {/*    )*/}
                            {/*}*/}
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                Save
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
