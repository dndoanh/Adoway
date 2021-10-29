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
const ProjectEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

export function ProjectEditForm({
    saveProject,
    project,
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
        if (project.avatarUrl) {
            setAvatarUrl(project.avatarUrl);
        }
    }, [project]);

    const getProjectAvatarUrl = () => {
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
                initialValues={project}
                validationSchema={ProjectEditSchema}
                onSubmit={(values) => {
                    saveProject(values);
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
                                        <DatePickerField
                                            name="activeDate"
                                            label="active Date"
                                            placeholder="Active Date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <DatePickerField
                                            name="beginDate"
                                            label="Begin Date"
                                            placeholder="Begin Date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="blockCount"
                                            component={Input}
                                            placeholder="Block Count"
                                            label="Block Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="floorCount"
                                            component={Input}
                                            placeholder="Floor Count"
                                            label="Floor Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="basementCount"
                                            component={Input}
                                            placeholder="Basement Count"
                                            label="Basement Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="squareCount"
                                            component={Input}
                                            placeholder="Square Count"
                                            label="Square Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="portCount"
                                            component={Input}
                                            placeholder="Port Count"
                                            label="Port Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            type="text"
                                            name="apartmentCount"
                                            component={Input}
                                            placeholder="Apartment Count"
                                            label="Apartment Count"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="projectType" label="Project Type">
                                            <option value="1">Investment</option>
                                            <option value="2">NoInvestment</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="areaType" label="Area Type">
                                            <option value="1">EastArea</option>
                                            <option value="2">WestArea</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="status" label="Status">
                                            <option value="1">Develop</option>
                                            <option value="2">Return</option>
                                            <option value="3">Active</option>
                                            <option value="4">Over</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="owner" label="Owner">
                                            <option value="1">Saigon Royal</option>
                                            <option value="0">Phuoc Long B</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="salesUser" label="Sales User">
                                            <option value="1">Tan</option>
                                            <option value="0">Hoa</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="techUser" label="Tech User">
                                            <option value="1">Nguyen</option>
                                            <option value="0">Hung</option>
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
