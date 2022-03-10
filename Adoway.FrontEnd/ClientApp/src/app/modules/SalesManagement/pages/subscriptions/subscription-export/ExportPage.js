// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from "react-redux";
import * as action from "../../../_redux/subscriptions/subscriptionsActions";

import {
    Input,
    Select,
    DatePickerField,
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as suppliersActions from "../../../../PurchaseManagement/_redux/suppliers/suppliersActions";


// Validation schema
const UserEditSchema = Yup.object().shape({

});

export function ExportPage({
    saveUser,
    user,
    actionsLoading,
    onHide,
}) {
    // Getting curret state of languages list from store (Redux)
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(projectsActions.fetchAllProjects);
        dispatch(suppliersActions.fetchAllSuppliers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { currentLanguagesState } = useSelector(
        (state) => ({ currentLanguagesState: state.languages }),
        shallowEqual
    );
    const { allLanguages } = currentLanguagesState;

    const [fileUrl, setFileUrl] = useState("");
    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const lang = intl.formatMessage({ id: "USER.LANGUAGE" })
    const model = {
        fileUrl: ""
    }
    const { currentProjectState } = useSelector(
        (state) => ({ currentProjectState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectState;

    const { currentSupplierState } = useSelector(
        (state) => ({ currentSupplierState: state.suppliers }),
        shallowEqual
    );
    const { allSuppliers } = currentSupplierState;


    return (
        <>
            <Card>
                <CardHeader title="Export">

                 </CardHeader>

                <CardBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={model}
                        onSubmit={(values) => {
                            debugger;
                            dispatch(action.exportSubscription(values))
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
                                            <div className="col-lg-3">
                                                <Select name="projectId" label="Project">
                                                    <option value=""></option>
                                                    {allProjects && allProjects.map((p) => (
                                                        <option key={p.id} value={p.id}>
                                                            {p.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="col-lg-3">
                                                <Select name="supplierId" label="Supplier" >
                                                    <option value=""></option>
                                                    {allSuppliers && allSuppliers.map((p) => (
                                                        <option key={p.id} value={p.id}>
                                                            {p.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-lg-6">
                                                <Field
                                                    name="Year"
                                                    component={Input}
                                                    placeholder="Year"
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
                </CardBody>
            </Card>
         
        </>
    );
}
