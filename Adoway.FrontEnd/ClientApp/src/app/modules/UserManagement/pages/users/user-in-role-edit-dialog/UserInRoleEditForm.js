// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Modal,Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../../_redux/users/usersActions";
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

export function UserInRoleEditForm({
    saveUser,
    user,
    actionsLoading,
    onHide,
}) {

    const { currentRolesState } = useSelector(
        (state) => ({ currentRolesState: state.roles }),
        shallowEqual
    );
    const { allRoles } = currentRolesState;

    const { currentUserInRolesState } = useSelector(
        (state) => ({ currentUserInRolesState: state.userInRoles }),
        shallowEqual
    );
    const { userInRoles } = currentUserInRolesState;
   
    const handleAddUserInRoles = (roleId) => {
        dispatch(userInRolesActions.createUserInRole(
            { roleId: roleId, userId: user.id, belongto: false }
        ));
    };
    const handleDeleteUserInRoles = (roleId) => {
        dispatch(userInRolesActions.deleteUserInRole(roleId));
    };
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
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-8">
                                        <Select name="roleId" label="Role" >
                                            <option value=""></option>
                                            {allRoles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-lg-4 mt-5">
                                        <button
                                            type="button"
                                            
                                            className="btn btn-primary btn-elevate mt-3"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                              
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userInRoles != undefined && (
                                                    userInRoles.map((role) =>(
                                                        <tr>
                                                            <td>{role.roleName}</td>
                                                            <td>{role.description}</td>
                                                            <td>
                                                                <button 
                                                                    type="button"
                                                                    className="btn btn-primary btn-elevate"
                                                                    onClick={() => handleDeleteUserInRoles(role.id)}
                                                                >
                                                                Delete
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    ))
                                                 )}
                                            </tbody>
                                        </Table>
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
