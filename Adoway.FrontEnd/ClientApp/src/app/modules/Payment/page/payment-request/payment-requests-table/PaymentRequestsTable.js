// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/payment-request/paymentRequestsActions";
import * as paymentRequestsActions from "../../../../Payment/_redux/payment-request/paymentRequestsActions";
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
import * as uiHelpers from "../PaymentRequestsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePaymentRequestsUIContext } from "../PaymentRequestsUIContext";

export function PaymentRequestsTable() {
    // PaymentRequests UI Context
    const paymentRequestsUIContext = usePaymentRequestsUIContext();
    const paymentRequestsUIProps = useMemo(() => {
        return {
            queryParams: paymentRequestsUIContext.queryParams,
            setQueryParams: paymentRequestsUIContext.setQueryParams,
            openEditPaymentRequestPage: paymentRequestsUIContext.openEditPaymentRequestPage,
            openDeletePaymentRequestDialog: paymentRequestsUIContext.openDeletePaymentRequestDialog
        };
    }, [paymentRequestsUIContext]);

    // Getting curret state of paymentRequests list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.paymentRequests }),
        shallowEqual
    );
  
    const { totalCount, entities, listLoading, needReload } = currentState;

    // PaymentRequests Redux state
    const dispatch = useDispatch();
    useEffect(() => {
     
        // server call by queryParams
        dispatch(actions.fetchPaymentRequests(paymentRequestsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentRequestsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    useEffect(() => {
        // server call by queryParams
   /*     dispatch(suppliersActions.fetchAllSuppliers());*/
        dispatch(usersActions.fetchAllUsers);
        dispatch(projectsActions.fetchAllProjects);
        dispatch(customersActions.fetchAllCustomers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "requestNo",
            text: "RequestNo",
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
            dataField: "projectName",
            text: "Project Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "status",
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
                openEditPaymentRequestPage: paymentRequestsUIProps.openEditPaymentRequestPage,
                openDeletePaymentRequestDialog: paymentRequestsUIProps.openDeletePaymentRequestDialog,
                Delete: Delete,
                Edit:Edit
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
        sizePerPage: paymentRequestsUIProps.queryParams.pageSize,
        page: paymentRequestsUIProps.queryParams.pageNumber,
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
                                    paymentRequestsUIProps.setQueryParams
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
