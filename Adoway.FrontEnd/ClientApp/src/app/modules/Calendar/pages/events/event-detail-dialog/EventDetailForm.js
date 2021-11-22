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
const EventDetailSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Title is required"),
});

export function EventDetailForm({
    id,
    saveEvent,
    event,
    actionsLoading,
    onHide,
    handleDelete,
    handleEdit,
    start,
    end
}) {

    //const { currentUsersState } = useSelector(
    //    (state) => ({ currentUsersState: state.users }),
    //    shallowEqual
    //);
    //const { allUsers } = currentUsersState;

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={event}
                validationSchema={EventDetailSchema}
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
                            {id && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(event.id)}
                                    className="btn btn-danger btn-elevate"
                                >
                                    Delete
                                </button>
                                )
                            }
                            <> </>
                            <button
                                type="button"
                                onClick={() => handleEdit({ start, end,id })}
                                className="btn btn-success btn-elevate"
                            >
                                Edit
                            </button>
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
