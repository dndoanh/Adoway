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
const WorkOrderEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

export function WorkOrderEditForm({
    saveWorkOrder,
    workOrder,
    actionsLoading,
    onHide,
}) {
    // Getting curret state of languages list from store (Redux)
    const { currentLanguagesState } = useSelector(
        (state) => ({ currentLanguagesState: state.languages }),
        shallowEqual
    );
    const { allLanguages } = currentLanguagesState;
    
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        if (workOrder.avatarUrl) {
            setAvatarUrl(workOrder.avatarUrl);
        }
    }, [workOrder]);

    const getWorkOrderAvatarUrl = () => {
        if (!avatarUrl) {
            return "none";
        }
        return `url(${avatarUrl})`;
    };
    const removeAvatarUrl = () => {
        setAvatarUrl("");
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={workOrder}
                validationSchema={WorkOrderEditSchema}
                onSubmit={(values) => {
                    saveWorkOrder(values);
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
                                        <Select name="workOrderType" label="WorkOrderType">
                                            <option value="1">LM</option>
                                            <option value="2">SC</option>
                                            <option value="3">DD</option>
                                            <option value="4">KS</option>
                                            <option value="5">HT</option>
                                            <option value="6">TC</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="workOrderCategory" label="WorkOrderCategory">
                                            <option value="1">Internet</option>
                                            <option value="2">CableTVNetwork</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="code"
                                            component={Input}
                                            placeholder="Code"
                                            label="Code"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <DatePickerField
                                            name="startDate"
                                            label="Start Date"
                                            placeholder="Start Date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                            <DatePickerField
                                                name="endDate"
                                                label="End Date"
                                                placeholder="End Date"
                                            />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="description"
                                            component={Input}
                                            as="textarea"
                                            className="form-control"
                                            placeholder="Description"
                                            label="Description"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="status" label="Status">
                                            <option value="1">Draft</option>
                                            <option value="2">Passed</option>
                                            <option value="3">InProgress</option>
                                            <option value="4">Finished</option>
                                            <option value="5">Done</option>
                                            <option value="6">Pending</option>
                                            <option value="7">Suspended</option>
                                            <option value="8">Returned</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="requester" label="Requester">
                                            <option value="1">Bo Cau</option>
                                            <option value="2">Green Tech</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="salesman" label="Salesman">
                                            <option value="1">Nhung</option>
                                            <option value="2">Hung</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="apartment" label="Apartment">
                                            <option value="1">Royal Riverside</option>
                                            <option value="2">The Easten</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="project" label="Project">
                                            <option value="1">Phuoc Long B</option>
                                            <option value="2">Saigon Royal</option>
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
