// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/subscriptions/subscriptionsActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../SubscriptionsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useSubscriptionsUIContext } from "../SubscriptionsUIContext";

export function SubscriptionsTable() {
    // Subscriptions UI Context
    const subscriptionsUIContext = useSubscriptionsUIContext();
    const subscriptionsUIProps = useMemo(() => {
        return {
            queryParams: subscriptionsUIContext.queryParams,
            setQueryParams: subscriptionsUIContext.setQueryParams,
            openEditSubscriptionDialog: subscriptionsUIContext.openEditSubscriptionDialog,
            openEditSubscriptionInRoleDialog: subscriptionsUIContext.openEditSubscriptionInRoleDialog,
            openDeleteSubscriptionDialog: subscriptionsUIContext.openDeleteSubscriptionDialog
        };
    }, [subscriptionsUIContext]);

    // Getting curret state of subscriptions list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.subscriptions }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Subscriptions Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchSubscriptions(subscriptionsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscriptionsUIProps.queryParams, dispatch, needReload]);

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
            dataField: "floor",
            text: "Floor",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "block",
            text: "Block",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "internetLine",
            text: "Internet Line",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "TV Line",
            text: "TV Line",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditSubscriptionDialog: subscriptionsUIProps.openEditSubscriptionDialog,
                openEditSubscriptionInRoleDialog: subscriptionsUIProps.openEditSubscriptionInRoleDialog,
                openDeleteSubscriptionDialog: subscriptionsUIProps.openDeleteSubscriptionDialog,
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
        sizePerPage: subscriptionsUIProps.queryParams.pageSize,
        page: subscriptionsUIProps.queryParams.pageNumber,
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
                                    subscriptionsUIProps.setQueryParams
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
