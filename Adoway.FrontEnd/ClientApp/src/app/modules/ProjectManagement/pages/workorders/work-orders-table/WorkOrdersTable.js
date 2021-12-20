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
import { FormattedMessage, useIntl } from 'react-intl';
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

    const intl = useIntl()
    const code = intl.formatMessage({ id: "WORK_ORDER.CODE" })
    const type = intl.formatMessage({ id: "WORK_ORDER.TYPE" })
    const category = intl.formatMessage({ id: "WORK_ORDER.CATEGORY" })
    const sdate = intl.formatMessage({ id: "TITLE.START_DATE" })
    const edate = intl.formatMessage({ id: "TITLE.END_DATE" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const requester = intl.formatMessage({ id: "COMMON.REQUESTER" })
    const salesman = intl.formatMessage({ id: "COMMON.SALESMAN" })
    const apartment = intl.formatMessage({ id: "COMMON.APARTMENT" })
    const project = intl.formatMessage({ id: "TITLE.PROJECT_NAME" })
    const action = intl.formatMessage({ id: "WORK_ORDER.CATEGORY" })
    const columns = [
        {
            dataField: "code",
            text: code,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "workOrderType",
            text: type,
            sort: true,
            formatter: columnFormatters.TypeColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "workOrderCategory",
            text: category,
            sort: true,
            formatter: columnFormatters.CategoryColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "startDate",
            text: sdate,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "endDate",
            text: edate ,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: status,
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.StatusColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "requesterName",
            text: requester,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "salesmanName",
            text: salesman,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "apartmentName",
            text: apartment,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "projectName",
            text: project,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: action,
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
