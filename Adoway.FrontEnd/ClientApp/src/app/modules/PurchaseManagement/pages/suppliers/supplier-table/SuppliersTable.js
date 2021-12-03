// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/suppliers/suppliersActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../SuppliersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useSuppliersUIContext } from "../SuppliersUIContext";

export function SuppliersTable() {
    // Suppliers UI Context
    const suppliersUIContext = useSuppliersUIContext();
    const suppliersUIProps = useMemo(() => {
        return {
            queryParams: suppliersUIContext.queryParams,
            setQueryParams: suppliersUIContext.setQueryParams,
            openEditSupplierDialog: suppliersUIContext.openEditSupplierDialog,
            openDeleteSupplierDialog: suppliersUIContext.openDeleteSupplierDialog
        };
    }, [suppliersUIContext]);

    // Getting curret state of suppliers list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.suppliers }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Suppliers Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchSuppliers(suppliersUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suppliersUIProps.queryParams, dispatch, needReload]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

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
            dataField: "address",
            text: "Address",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactName",
            text: "Contact Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactPhone",
            text: "Contact Phone",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactEmail",
            text: "Contact Email",
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
                openEditSupplierDialog: suppliersUIProps.openEditSupplierDialog,
                openEditSupplierInRoleDialog: suppliersUIProps.openEditSupplierInRoleDialog,
                openDeleteSupplierDialog: suppliersUIProps.openDeleteSupplierDialog,
                Delete: user.isSuperAdmin || Delete,
                Edit: user.isSuperAdmin || Edit
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
        sizePerPage: suppliersUIProps.queryParams.pageSize,
        page: suppliersUIProps.queryParams.pageNumber,
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
                                    suppliersUIProps.setQueryParams
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
