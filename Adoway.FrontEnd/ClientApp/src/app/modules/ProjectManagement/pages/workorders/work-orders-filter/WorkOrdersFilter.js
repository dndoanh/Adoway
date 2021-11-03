import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useWorkOrdersUIContext } from "../WorkOrdersUIContext";

const prepareFilter = (queryParams, values) => {
    const { status, searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    // Filter by status
    filter.status = status !== "" ? +status : undefined;
    // Filter by all fields
    filter.name = searchText;
    if (searchText) {
        filter.email = searchText;
    }
    newQueryParams.filter = filter;
    return newQueryParams;
};

export function WorkOrdersFilter({ listLoading }) {
    // WorkOrders UI Context
    const workOrdersUIContext = useWorkOrdersUIContext();
    const workOrdersUIProps = useMemo(() => {
        return {
            queryParams: workOrdersUIContext.queryParams,
            setQueryParams: workOrdersUIContext.setQueryParams,
        };
    }, [workOrdersUIContext]);

    // queryParams, setQueryParams,
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(workOrdersUIProps.queryParams, values);
        if (!isEqual(newQueryParams, workOrdersUIProps.queryParams)) {
            newQueryParams.pageNumber = 1;
            // update list by queryParams
            workOrdersUIProps.setQueryParams(newQueryParams);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    status: "", // values => All=""/Inactive=0/Active=1
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
                                    value={values.status}
                                >
                                    <option value="">All</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                <small className="form-text text-muted">
                                    <b>Filter</b> by Status
                                </small>
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
