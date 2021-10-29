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
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";

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
            openEditWorkOrderDialog: workOrdersUIContext.openEditWorkOrderDialog,
            openEditWorkOrderInRoleDialog: workOrdersUIContext.openEditWorkOrderInRoleDialog,
            openDeleteWorkOrderDialog: workOrdersUIContext.openDeleteWorkOrderDialog
        };
    }, [workOrdersUIContext]);

    // Getting curret state of workOrders list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.workOrders }),
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
  

    useEffect(() => {
        // server call by queryParams
        dispatch(languagesActions.fetchAllLanguages);
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
            dataField: "StartDate",
            text: "StartDate",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "EndDate",
            text: "EndDate",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "description",
            text: "Description",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "requester",
            text: "requester",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "salesman",
            text: "requester",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "apartment",
            text: "Apartment",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "project",
            text: "Project",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditWorkOrderDialog: workOrdersUIProps.openEditWorkOrderDialog,
                openEditWorkOrderInRoleDialog: workOrdersUIProps.openEditWorkOrderInRoleDialog,
                openDeleteWorkOrderDialog: workOrdersUIProps.openDeleteWorkOrderDialog,
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
