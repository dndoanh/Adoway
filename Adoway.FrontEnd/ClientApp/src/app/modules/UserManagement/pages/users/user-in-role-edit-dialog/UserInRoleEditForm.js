// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect, useMemo } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../../_redux/users/usersActions";
import * as userInRolesActions from "../../../_redux/users/userInRolesActions";
import { UserInRolesTable } from "../user-in-roles-table/UserInRolesTable";
import {
    Input,
    Select,
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { useUsersUIContext } from "../UsersUIContext";

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
    const dispatch = useDispatch();
    const addUserInRoles = () => {
        dispatch(userInRolesActions.createUserInRoles({
            id:"00000000-0000-0000-0000-000000000000",roleId: selectRole, userId: user.id,belongto:true
        })).then(() => {
            dispatch(userInRolesActions.fetchUserInRoles(user.id));
        });
    };
    const [selectRole, setSelectRole] = useState("");

    const { currentRolesState } = useSelector(
        (state) => ({ currentRolesState: state.roles }),
        shallowEqual
    );
    const { allRoles } = currentRolesState;

    const { currentState } = useSelector(
        (state) => ({ currentState: state.userInRoles }),
        shallowEqual
    );
    const { userInRoles } = currentState;

    const [filteredRoles, setFilteredRoles] = useState([]);
    useEffect(() => {
        let filterdList = userInRoles == null ? allRoles: allRoles.filter(o => !userInRoles.some(i => i.roleId === o.id));
        setFilteredRoles(filterdList);
    }, [allRoles, userInRoles]);


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
                                        <Select name="roleId" label="Role"
                                            onChange={(e) => {
                                                setSelectRole(e.target.value)
                                            }}
                                        >
                                            <option value=""></option>
                                            {filteredRoles.map((role) => (
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
                                            onClick={addUserInRoles}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <UserInRolesTable />
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
                         
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
