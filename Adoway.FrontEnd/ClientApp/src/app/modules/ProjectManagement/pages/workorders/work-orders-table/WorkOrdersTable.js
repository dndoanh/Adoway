// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workorders/workOrdersActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../WorkOrdersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useWorkOrdersUIContext } from "../WorkOrdersUIContext";

export function WorkOrdersTable() {
    // WorkOrders UI Context
    const workOrdersUIContext = useWorkOrdersUIContext();
    const workOrdersUIProps = useMemo(() => {
        return {
            queryParams: workOrdersUIContext.queryParams,
            setQueryParams: workOrdersUIContext.setQueryParams,
            openEditWorkOrderPage: workOrdersUIContext.openEditWorkOrderPage,
            openDeleteWorkOrderDialog: workOrdersUIContext.openDeleteWorkOrderDialog
        };
    }, [workOrdersUIContext]);

    // Getting curret state of workOrders list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.workorders }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // WorkOrders Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchWorkOrders(workOrdersUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workOrdersUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    useEffect(() => {
        // server call by queryParams
        dispatch(projectsActions.fetchAllProjects);
        dispatch(usersActions.fetchAllUsers);
        dispatch(customersActions.fetchAllCustomers);
        dispatch(apartmentsActions.fetchApartments({ filter: { name: "" }, sortOrder: "asc", sortField: "name", pageNumber: 1, pageSize: 10 }));
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
            dataField: "workOrderType",
            text: "Work Order Type",
            sort: true,
            formatter: columnFormatters.TypeColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "workOrderCategory",
            text: "Work Order Category",
            sort: true,
            formatter: columnFormatters.CategoryColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "startDate",
            text: "Start Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "endDate",
            text: "End Date",
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
            dataField: "requesterName",
            text: "Requester Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "salesmanName",
            text: "Salesman Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "apartmentName",
            text: "Apartment Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "projectName",
            text: "ProjectName",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditWorkOrderPage: workOrdersUIProps.openEditWorkOrderPage,
                openDeleteWorkOrderDialog: workOrdersUIProps.openDeleteWorkOrderDialog,
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
        sizePerPage: workOrdersUIProps.queryParams.pageSize,
        page: workOrdersUIProps.queryParams.pageNumber,
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
                                    workOrdersUIProps.setQueryParams
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
