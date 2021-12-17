// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/owners/ownersActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../OwnersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useOwnersUIContext } from "../OwnersUIContext";
import { FormattedMessage, useIntl } from 'react-intl';

export function OwnersTable() {
    // Owners UI Context
    const ownersUIContext = useOwnersUIContext();
    const ownersUIProps = useMemo(() => {
        return {
            queryParams: ownersUIContext.queryParams,
            setQueryParams: ownersUIContext.setQueryParams,
            openEditOwnerDialog: ownersUIContext.openEditOwnerDialog,
            openEditOwnerInRoleDialog: ownersUIContext.openEditOwnerInRoleDialog,
            openDeleteOwnerDialog: ownersUIContext.openDeleteOwnerDialog
        };
    }, [ownersUIContext]);

    // Getting curret state of owners list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.owners }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Owners Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchOwners(ownersUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownersUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const address = intl.formatMessage({ id: "PURCHASE.SUPPLIER.ADDRESS" })
    const contactName = intl.formatMessage({ id: "PURCHASE.SUPPLIER.CONTACT_NAME" })
    const contactPhone = intl.formatMessage({ id: "PURCHASE.SUPPLIER.CONTACT_PHONE" })
    const contactEmail = intl.formatMessage({ id: "PURCHASE.SUPPLIER.CONTACT_EMAIL" })
    const status = intl.formatMessage({ id: "PROJECT.APARTMENT.TV_LINE" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })

    useEffect(() => {
        // server call by queryParams
        dispatch(languagesActions.fetchAllLanguages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
            dataField: "address",
            text: address,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactName",
            text: contactName,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactPhone",
            text: contactPhone,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "contactEmail",
            text: contactEmail,
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
                openEditOwnerDialog: ownersUIProps.openEditOwnerDialog,
                openDeleteOwnerDialog: ownersUIProps.openDeleteOwnerDialog,
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
        sizePerPage: ownersUIProps.queryParams.pageSize,
        page: ownersUIProps.queryParams.pageNumber,
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
                                    ownersUIProps.setQueryParams
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
