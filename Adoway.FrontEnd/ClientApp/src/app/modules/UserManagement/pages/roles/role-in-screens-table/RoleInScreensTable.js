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
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import * as rolesActions from "../../../_redux/roles/rolesActions";
import * as roleInScreensActions from "../../../_redux/roles/roleInScreensActions";
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
import { useRolesUIContext } from "../RolesUIContext";

export function RoleInScreensTable() {
    // Roles UI Context
    const rolesUIContext = useRolesUIContext();
    const rolesUIProps = useMemo(() => {
        return {
            queryParams: rolesUIContext.queryParams,
            setQueryParams: rolesUIContext.setQueryParams,
            openDeleteRoleInScreensDialog: rolesUIContext.openDeleteRoleInScreensDialog,
        };
    }, [rolesUIContext]);
    const dispatch = useDispatch();
    // Getting curret state of roles list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.roleInScreens}),
        shallowEqual
    );
    const { roleInScreens } = currentState;
    const changeScreenFunction = (id) => {
        dispatch(roleInScreensActions.updateRoleInScreensStatus(id))
    }
    // Table columns
    const columns = [
        {
            dataField: "screenName",
            text: "Screen Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "screenFunctions",
            text: "Screen Functions",
            formatter: columnFormatters.ScreenFunctionColumnFormatter,
            formatExtraData: {
                changeScreenFunction: changeScreenFunction
            },
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        }
    
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
                data={roleInScreens === null ? [] : roleInScreens}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                    rolesUIProps.setQueryParams
                )}
            >
                <PleaseWaitMessage entities={roleInScreens} />
                <NoRecordsFoundMessage entities={roleInScreens} />
            </BootstrapTable>
        </>
    );
}
