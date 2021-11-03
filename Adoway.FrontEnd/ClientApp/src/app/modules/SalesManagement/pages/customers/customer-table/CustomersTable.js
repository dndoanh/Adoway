// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/customers/customersActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CustomersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCustomersUIContext } from "../CustomersUIContext";

export function CustomersTable() {
    // Customers UI Context
    const customersUIContext = useCustomersUIContext();
    const customersUIProps = useMemo(() => {
        return {
            queryParams: customersUIContext.queryParams,
            setQueryParams: customersUIContext.setQueryParams,
            openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
            openEditCustomerInRoleDialog: customersUIContext.openEditCustomerInRoleDialog,
            openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog
        };
    }, [customersUIContext]);

    // Getting curret state of customers list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.customers }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Customers Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchCustomers(customersUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customersUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
  

    useEffect(() => {
        // server call by queryParams
        dispatch(projectsActions.fetchAllProjects);
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
            dataField: "customerType",
            text: "Customer Type",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.TypeColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "phone",
            text: "Phone",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "address",
            text: "Address",
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
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
                openEditCustomerInRoleDialog: customersUIProps.openEditCustomerInRoleDialog,
                openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
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
        sizePerPage: customersUIProps.queryParams.pageSize,
        page: customersUIProps.queryParams.pageNumber,
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
                                    customersUIProps.setQueryParams
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
