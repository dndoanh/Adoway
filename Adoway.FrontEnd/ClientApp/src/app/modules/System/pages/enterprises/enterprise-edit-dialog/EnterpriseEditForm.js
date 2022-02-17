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
import { FormattedMessage, useIntl } from 'react-intl';

// Validation schema
const EnterpriseEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phone: Yup.string()
        .min(3, "Minimum 10 symbols")
        .max(50, "Maximum 10 symbols")
        .required("Phone is required")
});

export function EnterpriseEditForm({
    saveEnterprise,
    enterprise,
    actionsLoading,
    onHide,
}) {

    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const phone = intl.formatMessage({ id: "CUSTOMER.PHONE" })
    const address = intl.formatMessage({ id: "PURCHASE.SUPPLIER.ADDRESS" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={enterprise}
                validationSchema={EnterpriseEditSchema}
                onSubmit={(values) => {
                    saveEnterprise(values);
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
                                    <div className="col-lg-6">
                                        <Field
                                            name="name"
                                            component={Input}
                                            placeholder={name}
                                            label={name}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Field
                                            type="email"
                                            name="email"
                                            component={Input}
                                            placeholder="Email"
                                            label="Email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="address"
                                            component={Input}
                                            placeholder={address}
                                            label={address}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Field
                                            name="phone"
                                            component={Input}
                                            placeholder={phone}
                                            label={phone}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Select name="status" label={status}>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
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
                                <FormattedMessage
                                    id="COMMON.CANCEL"
                                />
                            </button>
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                <FormattedMessage
                                    id="COMMON.SAVE"
                                />
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
