// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import * as rolesActions from "../../../../UserManagement/_redux/roles/rolesActions";
import { FormattedMessage, useIntl } from 'react-intl';
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUsersUIContext } from "../UsersUIContext";

export function UsersTable() {
    // Users UI Context
    const usersUIContext = useUsersUIContext();
    const usersUIProps = useMemo(() => {
        return {
            queryParams: usersUIContext.queryParams,
            setQueryParams: usersUIContext.setQueryParams,
            openEditUserDialog: usersUIContext.openEditUserDialog,
            openEditUserInRoleDialog: usersUIContext.openEditUserInRoleDialog,
            openDeleteUserDialog: usersUIContext.openDeleteUserDialog
        };
    }, [usersUIContext]);

    // Getting curret state of users list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.users }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Users Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchUsers(usersUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    useEffect(() => {
        // server call by queryParams
        dispatch(rolesActions.fetchAllRoles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // server call by queryParams
        dispatch(languagesActions.fetchAllLanguages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const DeleteUser = user.functions.find(x => x.code == "DeleteUser")
    const EditUser = user.functions.find(x => x.code == "EditUser")
    const intl = useIntl()
    const avt = intl.formatMessage({ id: "USER.AVARTAR" })
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })
    // Table columns
    const columns = [
        {
            dataField: "avatarUrl",
            text: avt,
            sort: false,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: columnFormatters.AvatarColumnFormatter,
        },
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
                openEditUserDialog: usersUIProps.openEditUserDialog,
                openEditUserInRoleDialog: usersUIProps.openEditUserInRoleDialog,
                openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
                DeleteUser: user.isSuperAdmin || DeleteUser,
                EditUser: user.isSuperAdmin || EditUser
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
        sizePerPage: usersUIProps.queryParams.pageSize,
        page: usersUIProps.queryParams.pageNumber,
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
                                    usersUIProps.setQueryParams
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
