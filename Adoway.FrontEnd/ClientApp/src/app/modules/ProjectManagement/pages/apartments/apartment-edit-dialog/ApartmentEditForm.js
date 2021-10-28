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
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

export function ApartmentEditForm({
    saveApartment,
    apartment,
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
        if (apartment.avatarUrl) {
            setAvatarUrl(apartment.avatarUrl);
        }
    }, [apartment]);

    const getApartmentAvatarUrl = () => {
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
                                        <div
                                            className="image-input image-input-outline"
                                            id="kt_profile_avatar"
                                            style={{
                                                backgroundImage: `url(${toAbsoluteUrl(
                                                    "/media/apartments/blank.png"
                                                )}`,
                                            }}
                                        >
                                            <div
                                                className="image-input-wrapper"
                                                style={{ backgroundImage: `${getApartmentAvatarUrl()}` }}
                                            />
                                            <label
                                                className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                                data-action="change"
                                                data-toggle="tooltip"
                                                title=""
                                                data-original-title="Change avatar"
                                            >
                                                <i className="fa fa-pen icon-sm text-muted"></i>
                                                <input
                                                    type="file"
                                                    name="avatarUrl"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={(e) => {
                                                        const fileReader = new FileReader();
                                                        fileReader.onload = () => {
                                                            if (fileReader.readyState === 2) {
                                                                setFieldValue('avatarUrl', fileReader.result);
                                                                setAvatarUrl(fileReader.result);
                                                            }
                                                        };
                                                        fileReader.readAsDataURL(e.target.files[0]);
                                                    }}
                                                />
                                                <input type="hidden" name="profile_avatar_remove" />
                                            </label>
                                            <span
                                                className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                                data-action="cancel"
                                                data-toggle="tooltip"
                                                title=""
                                                data-original-title="Cancel avatar"
                                            >
                                                <i className="ki ki-bold-close icon-xs text-muted"></i>
                                            </span>
                                            <span
                                                onClick={removeAvatarUrl}
                                                className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                                data-action="remove"
                                                data-toggle="tooltip"
                                                title=""
                                                data-original-title="Remove avatar"
                                            >
                                                <i className="ki ki-bold-close icon-xs text-muted"></i>
                                            </span>
                                        </div>
                                        <span className="form-text text-muted">
                                            Allowed file types: png, jpg, jpeg.
                                        </span>
                                    </div>
                                </div>
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
                                        <Select name="languageId" label="Language">
                                            <option value=""></option>
                                            {allLanguages.map((language) => (
                                                <option key={language.id} value={language.id}>
                                                    {language.name}
                                                </option>
                                            ))}
                                        </Select>
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
