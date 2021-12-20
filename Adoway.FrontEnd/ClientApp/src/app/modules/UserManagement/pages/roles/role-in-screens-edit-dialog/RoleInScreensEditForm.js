// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect, useMemo } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../../_redux/roles/rolesActions";
import * as roleInScreensActions from "../../../_redux/roles/roleInScreensActions";
import { RoleInScreensTable } from "../role-in-screens-table/RoleInScreensTable";
import {
    Input,
    Select,
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { useRolesUIContext } from "../RolesUIContext";
import { FormattedMessage, useIntl } from 'react-intl';
export function RoleInScreensEditForm({
    saveRole,
    role,
    actionsLoading,
    onHide,
}) {

    const { currentRoleInScreensState } = useSelector(
        (state) => ({ currentRoleInScreensState: state.roleInScreens }),
        shallowEqual
    );
    const { roleInScreens } = currentRoleInScreensState;
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={roleInScreens}
                onSubmit={(values) => {
                    saveRole(values);
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
                                        <RoleInScreensTable />
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
