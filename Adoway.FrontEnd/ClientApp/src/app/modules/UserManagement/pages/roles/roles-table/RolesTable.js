// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/roles/rolesActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../RolesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useRolesUIContext } from "../RolesUIContext";

export function RolesTable() {
    // Roles UI Context
    const rolesUIContext = useRolesUIContext();
    const rolesUIProps = useMemo(() => {
        return {
            queryParams: rolesUIContext.queryParams,
            setQueryParams: rolesUIContext.setQueryParams,
            openEditRoleDialog: rolesUIContext.openEditRoleDialog,
            openEditRoleInScreensDialog: rolesUIContext.openEditRoleInScreensDialog,
            openDeleteRoleDialog: rolesUIContext.openDeleteRoleDialog,
        };
    }, [rolesUIContext]);

    // Getting current state of roles list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.roles }),
        shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;

    // Roles Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchRoles(rolesUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rolesUIProps.queryParams, dispatch]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const DeleteRole = user.functions.find(x => x.code == "DeleteRole")
    const EditRole = user.functions.find(x => x.code == "EditRole")

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
            formatter: columnFormatters.StatusColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditRoleDialog: rolesUIProps.openEditRoleDialog,
                openEditRoleInScreensDialog: rolesUIProps.openEditRoleInScreensDialog,
                openDeleteRoleDialog: rolesUIProps.openDeleteRoleDialog,
                DeleteRole: DeleteRole,
                EditRole: EditRole
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
        sizePerPage: rolesUIProps.queryParams.pageSize,
        page: rolesUIProps.queryParams.pageNumber,
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
                                    rolesUIProps.setQueryParams
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
