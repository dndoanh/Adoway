import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { usePaymentRequestsUIContext } from "../PaymentRequestsUIContext";
import {
    Input, Select, DatePickerField
} from "../../../../../../_metronic/_partials/controls";

const prepareFilter = (queryParams, values) => {
    const { status, searchText, projectId } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // Filter by status
    filter.status = status !== "" ? +status : undefined;
    filter.projectId = projectId !== "" ? projectId : undefined;
    // Filter by all fields
    //filter.name = searchText;
    //if (searchText) {
    //    filter.email = searchText;
    //}
    newQueryParams.filter = filter;
    return newQueryParams;
};

export function PaymentRequestsFilter({ listLoading }) {
    // PaymentRequests UI Context
    const paymentRequestsUIContext = usePaymentRequestsUIContext();
    const paymentRequestsUIProps = useMemo(() => {
        return {
            queryParams: paymentRequestsUIContext.queryParams,
            setQueryParams: paymentRequestsUIContext.setQueryParams,
        };
    }, [paymentRequestsUIContext]);

    // queryParams, setQueryParams,
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(paymentRequestsUIProps.queryParams, values);
        if (!isEqual(newQueryParams, paymentRequestsUIProps.queryParams)) {
            newQueryParams.pageNumber = 1;
            // update list by queryParams
            paymentRequestsUIProps.setQueryParams(newQueryParams);
        }
    };
    const { currentProjectsState } = useSelector(
        (state) => ({ currentProjectsState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectsState;

    const { currentSuppliersState } = useSelector(
        (state) => ({ currentSuppliersState: state.suppliers }),
        shallowEqual
    );
    const { entities } = currentSuppliersState;

    return (
        <>
            <Formik
                initialValues={{
                    status: "", // values => All=""/Inactive=0/Active=1
                    projectId: undefined,
                    searchText: "",
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="form-group row">
                            <div className="col-lg-2">
                                <select
                                    className="form-control"
                                    name="status"
                                    placeholder="Filter by Status"
                                    // TODO: Change this code
                                    onChange={(e) => {
                                        setFieldValue("status", e.target.value);
                                        handleSubmit();
                                    }}
                                    onBlur={handleBlur}
                                    value={values.paymentStatus}
                                >
                                    <option value="">All</option>
                                    <option value="1">Unpaid</option>
                                    <option value="2">Paid</option>
                                </select>
                                <small className="form-text text-muted">
                                    <b>Filter</b> by Status
                                </small>
                            </div>
                            <div className="col-lg-2">
                                <Select name="projectId"
                                    onChange={(e) => {
                                        setFieldValue("projectId", e.target.value);
                                        handleSubmit();
                                    }}
                                    value={values.projectId}
                                    placeholder="Filter by Project"
                                >
                                    <option value="">All</option>
                                    {allProjects && allProjects.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div className="col-lg-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Search"
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                                <small className="form-text text-muted">
                                    <b>Search</b> in all fields
                                </small>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
