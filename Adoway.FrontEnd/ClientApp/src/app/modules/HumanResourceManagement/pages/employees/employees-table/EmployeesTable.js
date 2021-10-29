// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employees/employeesActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../EmployeesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useEmployeesUIContext } from "../EmployeesUIContext";

export function EmployeesTable() {
    // Employees UI Context
    const employeesUIContext = useEmployeesUIContext();
    const employeesUIProps = useMemo(() => {
        return {
            queryParams: employeesUIContext.queryParams,
            setQueryParams: employeesUIContext.setQueryParams,
            openEditEmployeeDialog: employeesUIContext.openEditEmployeeDialog,
            openDeleteEmployeeDialog: employeesUIContext.openDeleteEmployeeDialog
        };
    }, [employeesUIContext]);

    // Getting curret state of employees list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.employees }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Employees Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchEmployees(employeesUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeesUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item


    useEffect(() => {
        // server call by queryParams
        dispatch(languagesActions.fetchAllLanguages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "name",
            text: "Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "mobilePhone",
            text: "Mobile Phone",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "workMail",
            text: "WorkMail",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.StatusColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "manager",
            text: "Manager",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "department",
            text: "Department",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditEmployeeDialog: employeesUIProps.openEditEmployeeDialog,
                openDeleteEmployeeDialog: employeesUIProps.openDeleteEmployeeDialog,
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];
    // Table pagination properties
    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: uiHelpers.sizePerPageList,
        sizePerPage: employeesUIProps.queryParams.pageSize,
        page: employeesUIProps.queryParams.pageNumber,
    };
    return (
        <>
            <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                {({ paginationProps, paginationTableProps }) => {
                    return (
                        <Pagination
                            isLoading={listLoading}
                            paginationProps={paginationProps}
                        >
                            <BootstrapTable
                                wrapperClasses="table-responsive"
                                bordered={false}
                                classes="table table-head-custom table-vertical-center overflow-hidden"
                                bootstrap4
                                remote
                                keyField="id"
                                data={entities === null ? [] : entities}
                                columns={columns}
                                defaultSorted={uiHelpers.defaultSorted}
                                onTableChange={getHandlerTableChange(
                                    employeesUIProps.setQueryParams
                                )}
                                {...paginationTableProps}
                            >
                                <PleaseWaitMessage entities={entities} />
                                <NoRecordsFoundMessage entities={entities} />
                            </BootstrapTable>
                        </Pagination>
                    );
                }}
            </PaginationProvider>
        </>
    );
}
