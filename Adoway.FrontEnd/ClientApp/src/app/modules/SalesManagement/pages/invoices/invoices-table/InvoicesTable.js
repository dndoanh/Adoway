// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/invoices/invoicesActions";
import * as invoicesActions from "../../../../SalesManagement/_redux/invoices/invoicesActions";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
import * as ownersActions from "../../../../ProjectManagement/_redux/owners/ownersActions";
import * as suppliersActions from "../../../../PurchaseManagement/_redux/suppliers/suppliersActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../InvoicesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useInvoicesUIContext } from "../InvoicesUIContext";

export function InvoicesTable() {
    // Invoices UI Context
    const invoicesUIContext = useInvoicesUIContext();
    const invoicesUIProps = useMemo(() => {
        return {
            queryParams: invoicesUIContext.queryParams,
            setQueryParams: invoicesUIContext.setQueryParams,
            openEditInvoicePage: invoicesUIContext.openEditInvoicePage,
            openDeleteInvoiceDialog: invoicesUIContext.openDeleteInvoiceDialog
        };
    }, [invoicesUIContext]);

    // Getting curret state of invoices list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.invoices }),
        shallowEqual
    );
  
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Invoices Redux state
    const dispatch = useDispatch();
    useEffect(() => {
     
        // server call by queryParams
        dispatch(actions.fetchInvoices(invoicesUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoicesUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item

    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteInvoice")
    const Edit = user.functions.find(x => x.code == "EditInvoice")

    useEffect(() => {
        // server call by queryParams
   /*     dispatch(suppliersActions.fetchAllSuppliers());*/
        dispatch(suppliersActions.fetchSuppliers({ filter: { name: "" }, sortOrder: "asc", sortField: "name", pageNumber: 1, pageSize: 1000 }));
        dispatch(projectsActions.fetchAllProjects);
        dispatch(customersActions.fetchAllCustomers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "invoiceNo",
            text: "InvoiceNo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "invoicedDate",
            text: "Invoiced Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
      
        {
            dataField: "dueDate",
            text: "Due Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "customerName",
            text: "Customer Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "supplierName",
            text: "Supplier Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "projectName",
            text: "Project Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "paymentStatus",
            text: "Payment Status",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.TypeColumnFormatter,
            headerSortingClasses,
        },

        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditInvoicePage: invoicesUIProps.openEditInvoicePage,
                openDeleteInvoiceDialog: invoicesUIProps.openDeleteInvoiceDialog,
                Edit: user.isSuperAdmin || Edit,
                Delete: user.isSuperAdmin || Delete
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
        sizePerPage: invoicesUIProps.queryParams.pageSize,
        page: invoicesUIProps.queryParams.pageNumber,
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
                                    invoicesUIProps.setQueryParams
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
