// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal,Tabs,Tab,Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

// Validation schema
const UserEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

export function UserEditForm({
    saveUser,
    user,
    actionsLoading,
    onHide,
    roles,
}) {
    // Getting curret state of languages list from store (Redux)
    const { currentLanguagesState } = useSelector(
        (state) => ({ currentLanguagesState: state.languages }),
        shallowEqual
    );
    const { allLanguages } = currentLanguagesState;
    
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        if (user.avatarUrl) {
            setAvatarUrl(user.avatarUrl);
        }
    }, [user]);

    const getUserAvatarUrl = () => {
        if (!avatarUrl) {
            return "none";
        }
        return `url(${avatarUrl})`;
    };
    const removeAvatarUrl = () => {
        setAvatarUrl("");
    };
    const [key, setKey] = useState('home');
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={user}
                validationSchema={UserEditSchema}
                onSubmit={(values) => {
                    saveUser(values);
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
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Home">
                                    <Form className="form form-label-right">
                                        <div className="form-group row">
                                            <div className="col-lg-12">
                                                <div
                                                    className="image-input image-input-outline"
                                                    id="kt_profile_avatar"
                                                    style={{
                                                        backgroundImage: `url(${toAbsoluteUrl(
                                                            "/media/users/blank.png"
                                                        )}`,
                                                    }}
                                                >
                                                    <div
                                                        className="image-input-wrapper"
                                                        style={{ backgroundImage: `${getUserAvatarUrl()}` }}
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
                                            <div className="col-lg-6">
                                                <Field
                                                    name="name"
                                                    component={Input}
                                                    placeholder="Name"
                                                    label="Name"
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
                                            <div className="col-lg-6">
                                                <Select name="gender" label="Gender">
                                                    <option value="0">Male</option>
                                                    <option value="1">Female</option>
                                                </Select>
                                            </div>
                                            <div className="col-lg-6">
                                                <Select name="userType" label="User Type">
                                                    <option value="1">Administator</option>
                                                    <option value="2">Operator</option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-lg-6">
                                                <Select name="status" label="Status">
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </Select>
                                            </div>
                                            <div className="col-lg-6">
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
                                    </Form>
                                </Tab>
                                <Tab eventKey="profile" title="Role">
                                    <div className="form-group row">
                                     
                                        <div className="col-lg-6">
                                            <Select name="role" label="Role">
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </Select>
                                        </div>
                                        <div className="col-lg-4 mt-5">
                                            <button
                                                type="button" 
                                                className="btn btn-primary btn-elevate mt-3"
                                            >
                                                Add Role
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <label>Test</label>
                                                {roles.map(cell => {
                                                    debugger;
                                                    return ( cell.Name)
                                                })}
                                                <tr>
                                                    <td>Role 1</td>
                                                    <td>Otto</td>
                                                    <td>
                                                        <button
                                                        type="button"
                                                        className="btn btn-primary btn-elevate"
                                                        >
                                                        Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Role 2</td>
                                                    <td>Thornton</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-elevate"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Role 3</td>
                                                    <td>Thornton</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-elevate"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Tab>
                             
                            </Tabs>
                           
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
