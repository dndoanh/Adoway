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
const OwnerEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

export function OwnerEditForm({
    saveOwner,
    owner,
    actionsLoading,
    onHide,
}) {
    
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        if (owner.avatarUrl) {
            setAvatarUrl(owner.avatarUrl);
        }
    }, [owner]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={owner}
                validationSchema={OwnerEditSchema}
                onSubmit={(values) => {
                    saveOwner(values);
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
                                            type="text"
                                            name="address"
                                            component={Input}
                                            placeholder="Adress"
                                            label="Address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="contactName"
                                            component={Input}
                                            placeholder="ContactName"
                                            label="ContactName"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="contactPhone"
                                            component={Input}
                                            placeholder="ContactPhone"
                                            label="ContactPhone"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="contactEmail"
                                            component={Input}
                                            placeholder="Contact Email"
                                            label="Contact Email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="status" label="Status">
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </Select>
                                    </div>
                                </div>
                                {/*<div className="form-group row">*/}
                                {/*    <div className="col-lg-12">*/}
                                {/*        <Select name="languageId" label="Language">*/}
                                {/*            <option value=""></option>*/}
                                {/*            {allLanguages.map((language) => (*/}
                                {/*                <option key={language.id} value={language.id}>*/}
                                {/*                    {language.name}*/}
                                {/*                </option>*/}
                                {/*            ))}*/}
                                {/*        </Select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*    <div className="col-lg-12">*/}
                                {/*        <Select name="status" label="Status">*/}
                                {/*            <option value="1">Active</option>*/}
                                {/*            <option value="0">Inactive</option>*/}
                                {/*        </Select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
