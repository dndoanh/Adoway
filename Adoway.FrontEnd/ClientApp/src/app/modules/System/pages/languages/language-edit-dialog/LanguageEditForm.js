// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const LanguageEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    locale: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Locale is required"),
});



export function LanguageEditForm({
    saveLanguage,
    language,
    actionsLoading,
    onHide,
}) {
    const changeIsDefault = (val) => {
        console.log("Changed");
        //language.isDefault = false;
    };
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={language}
                validationSchema={LanguageEditSchema}
                onSubmit={(values) => {
                    saveLanguage(values);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur }) => (
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
                                            name="locale"
                                            component={Input}
                                            placeholder="Locale"
                                            label="Locale"
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
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        {/*<Checkbox onChange={changeIsDefault} isSelected={true }>*/}
                                        {/*</Checkbox>*/}
                                        <div className="checkbox-inline">
                                            <label className="checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="isDefault"
                                                    checked={values.isDefault}
                                                    onChange={handleChange}
                                                />
                                                <span></span>Is Default
                                            </label>
                                        </div>
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
