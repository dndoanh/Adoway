// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/payments/paymentsActions";
import * as paymentsActions from "../../../../PaymentManagement/_redux/payments/paymentsActions";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
import * as apartmentsActions from "../../../../PaymentManagement/_redux/apartments/apartmentsActions";
import * as ownersActions from "../../../../PaymentManagement/_redux/owners/ownersActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PaymentsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePaymentsUIContext } from "../PaymentsUIContext";

export function PaymentsTable() {
    // Payments UI Context
    const paymentsUIContext = usePaymentsUIContext();
    const paymentsUIProps = useMemo(() => {
        return {
            queryParams: paymentsUIContext.queryParams,
            setQueryParams: paymentsUIContext.setQueryParams,
            openEditPaymentPage: paymentsUIContext.openEditPaymentPage,
            openDeletePaymentDialog: paymentsUIContext.openDeletePaymentDialog
        };
    }, [paymentsUIContext]);

    // Getting curret state of payments list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.payments }),
        shallowEqual
    );
  
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Payments Redux state
    const dispatch = useDispatch();
    useEffect(() => {
     
        // server call by queryParams
        dispatch(actions.fetchPayments(paymentsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
  

    useEffect(() => {
        // server call by queryParams
        dispatch(usersActions.fetchAllUsers);
        dispatch(ownersActions.fetchAllOwners);
        //dispatch(apartmentsActions.fetchApartments({ filter: { name: "" }, sortOrder: "asc", sortField: "name", pageNumber: 1, pageSize: 10 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "code",
            text: "Code",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
      
        {
            dataField: "activeDate",
            text: "Active Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "beginDate",
            text: "Begin Date",
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
            dataField: "areaType",
            text: "Area Type",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.AreaColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "paymentType",
            text: "Payment Type",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.TypeColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "ownerName",
            text: "Owner Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },

        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditPaymentPage: paymentsUIProps.openEditPaymentPage,
                openDeletePaymentDialog: paymentsUIProps.openDeletePaymentDialog,
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
        sizePerPage: paymentsUIProps.queryParams.pageSize,
        page: paymentsUIProps.queryParams.pageNumber,
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
                                    paymentsUIProps.setQueryParams
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
