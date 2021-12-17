// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/projects/projectsActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";
import * as ownersActions from "../../../../ProjectManagement/_redux/owners/ownersActions";
import { FormattedMessage, useIntl } from 'react-intl';
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ProjectsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProjectsUIContext } from "../ProjectsUIContext";

export function ProjectsTable() {
    // Projects UI Context
    const projectsUIContext = useProjectsUIContext();
    const projectsUIProps = useMemo(() => {
        return {
            queryParams: projectsUIContext.queryParams,
            setQueryParams: projectsUIContext.setQueryParams,
            openEditProjectPage: projectsUIContext.openEditProjectPage,
            openDeleteProjectDialog: projectsUIContext.openDeleteProjectDialog
        };
    }, [projectsUIContext]);

    // Getting curret state of projects list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.projects }),
        shallowEqual
    );
  
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Projects Redux state
    const dispatch = useDispatch();
    useEffect(() => {
     
        // server call by queryParams
        dispatch(actions.fetchProjects(projectsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    useEffect(() => {
        // server call by queryParams
        dispatch(usersActions.fetchAllUsers);
        dispatch(ownersActions.fetchAllOwners);
        //dispatch(apartmentsActions.fetchApartments({ filter: { name: "" }, sortOrder: "asc", sortField: "name", pageNumber: 1, pageSize: 10 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns

    const intl = useIntl()
    const code = intl.formatMessage({ id: "PROJECT.CODE" })
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const activeDate = intl.formatMessage({ id: "PROJECT.ACTIVE_DATE" })
    const beginDate = intl.formatMessage({ id: "PROJECT.BEGIN_DATE" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })
    const p_type = intl.formatMessage({ id: "PROJECT.AREA_TYPE" })
    const a_type = intl.formatMessage({ id: "PROJECT.PROJECT_TYPE" })
    const owner = intl.formatMessage({ id: "COMMON.OWNER" })
    const columns = [
        {
            dataField: "code",
            text: code,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "name",
            text: name,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
      
        {
            dataField: "activeDate",
            text: activeDate,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "beginDate",
            text: beginDate ,
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
            dataField: "areaType",
            text: a_type,
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.AreaColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "projectType",
            text: p_type,
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.TypeColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "ownerName",
            text: owner,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },

        {
            dataField: "action",
            text: action,
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditProjectPage: projectsUIProps.openEditProjectPage,
                openDeleteProjectDialog: projectsUIProps.openDeleteProjectDialog,
                Delete: user.isSuperAdmin|| Delete,
                Edit: user.isSuperAdmin|| Edit
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
        sizePerPage: projectsUIProps.queryParams.pageSize,
        page: projectsUIProps.queryParams.pageNumber,
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
                                    projectsUIProps.setQueryParams
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
