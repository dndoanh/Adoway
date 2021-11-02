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
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

// Validation schema
const ApartmentEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required")
});

export function ApartmentEditForm({
    saveApartment,
    apartment,
    actionsLoading,
    onHide,
}) {
  
    const { currentProjectsState } = useSelector(
        (state) => ({ currentProjectsState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectsState;
    
    const { currentOwnersState } = useSelector(
        (state) => ({ currentOwnersState: state.customers }),
        shallowEqual
    );
    const { allCustomers } = currentOwnersState;

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={apartment}
                validationSchema={ApartmentEditSchema}
                onSubmit={(values) => {
                    saveApartment(values);
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
                                            name="name"
                                            component={Input}
                                            placeholder="Name"
                                            label="Name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="description"
                                            as="textarea"
                                            className="form-control"
                                            label="Description"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="floor"
                                            component={Input}
                                            placeholder="Floor"
                                            label="Floor"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="floor"
                                            component={Input}
                                            placeholder="Floor"
                                            label="Floor"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="block"
                                            component={Input}
                                            placeholder="Block"
                                            label="Block"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="internetLine"
                                            component={Input}
                                            placeholder="Internet Line"
                                            label="Internet Line"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="tvLine"
                                            component={Input}
                                            placeholder="TV Line"
                                            label="TV Line"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="ownerId" label="Owner">
                                            <option value=""></option>
                                            {allCustomers && allCustomers.map((owner) => (
                                                <option key={owner.id} value={owner.id}>
                                                    {owner.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="projectId" label="Project">
                                            <option value=""></option>
                                            {allProjects && allProjects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </Select>
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
