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
    const columns = [
        {
            dataField: "code",
            text: "Code",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
      
        {
            dataField: "activeDate",
            text: "Active Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "beginDate",
            text: "Begin Date",
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
            dataField: "areaType",
            text: "Area Type",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.AreaColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "projectType",
            text: "Project Type",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.TypeColumnFormatter,
            headerSortingClasses,
        },
        {
            dataField: "ownerName",
            text: "Owner Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },

        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditProjectPage: projectsUIProps.openEditProjectPage,
                openDeleteProjectDialog: projectsUIProps.openDeleteProjectDialog,
                Delete: Delete,
                Edit: Edit
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
