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
import * as rolesActions from "../../../_redux/roles/rolesActions";

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
import { useUsersUIContext } from "../UsersUIContext";

export function UserInRolesTable() {
    // Users UI Context
    const usersUIContext = useUsersUIContext();
    const usersUIProps = useMemo(() => {
        return {
            queryParams: usersUIContext.queryParams,
            setQueryParams: usersUIContext.setQueryParams,
            openDeleteUserInRolesDialog: usersUIContext.openDeleteUserInRolesDialog
        };
    }, [usersUIContext]);

    // Getting curret state of users list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.userInRoles}),
        shallowEqual
    );
    const { userInRoles } = currentState;
    // Table columns
    const columns = [
        {
            dataField: "roleName",
            text: "Role Name",
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
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openDeleteUserInRolesDialog: usersUIProps.openDeleteUserInRolesDialog,
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];
    return (
        <>
            <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={userInRoles === null ? [] : userInRoles}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                    usersUIProps.setQueryParams
                )}
            >
                <PleaseWaitMessage entities={userInRoles} />
                <NoRecordsFoundMessage entities={userInRoles} />
            </BootstrapTable>
        </>
    );
}
