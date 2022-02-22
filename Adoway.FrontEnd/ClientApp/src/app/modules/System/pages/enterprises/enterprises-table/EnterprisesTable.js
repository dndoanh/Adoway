// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/enterprises/enterprisesActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../EnterprisesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useEnterprisesUIContext } from "../EnterprisesUIContext";
import { FormattedMessage, useIntl } from 'react-intl';

export function EnterprisesTable() {
    // Enterprises UI Context
    const enterprisesUIContext = useEnterprisesUIContext();
    const enterprisesUIProps = useMemo(() => {
        return {
            queryParams: enterprisesUIContext.queryParams,
            setQueryParams: enterprisesUIContext.setQueryParams,
            openEditEnterpriseDialog: enterprisesUIContext.openEditEnterpriseDialog,
            openDeleteEnterpriseDialog: enterprisesUIContext.openDeleteEnterpriseDialog,
        };
    }, [enterprisesUIContext]);

    // Getting curret state of enterprises list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.enterprises }),
        shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;

    // Enterprises Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchEnterprises(enterprisesUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterprisesUIProps.queryParams, dispatch]);

    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const phone = intl.formatMessage({ id: "CUSTOMER.PHONE" })
    const address = intl.formatMessage({ id: "PURCHASE.SUPPLIER.ADDRESS" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })
    

    // Table columns
    const columns = [
        {
            dataField: "name",
            text: name,
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
            dataField: "phone",
            text: phone,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "address",
            text: address,
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
            dataField: "action",
            text: action,
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditEnterpriseDialog: enterprisesUIProps.openEditEnterpriseDialog,
                openDeleteEnterpriseDialog: enterprisesUIProps.openDeleteEnterpriseDialog,
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
        sizePerPage: enterprisesUIProps.queryParams.pageSize,
        page: enterprisesUIProps.queryParams.pageNumber,
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
                                    enterprisesUIProps.setQueryParams
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
