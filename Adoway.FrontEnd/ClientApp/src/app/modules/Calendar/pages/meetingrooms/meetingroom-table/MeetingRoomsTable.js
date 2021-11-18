// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/meetingrooms/meetingRoomsActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../MeetingRoomsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useMeetingRoomsUIContext } from "../MeetingRoomsUIContext";

export function MeetingRoomsTable() {
    // MeetingRooms UI Context
    const meetingRoomsUIContext = useMeetingRoomsUIContext();
    const meetingRoomsUIProps = useMemo(() => {
        return {
            queryParams: meetingRoomsUIContext.queryParams,
            setQueryParams: meetingRoomsUIContext.setQueryParams,
            openEditMeetingRoomDialog: meetingRoomsUIContext.openEditMeetingRoomDialog,
            openEditMeetingRoomInRoleDialog: meetingRoomsUIContext.openEditMeetingRoomInRoleDialog,
            openDeleteMeetingRoomDialog: meetingRoomsUIContext.openDeleteMeetingRoomDialog
        };
    }, [meetingRoomsUIContext]);

    // Getting curret state of meetingRooms list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.meetingrooms }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // MeetingRooms Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchMeetingRooms(meetingRoomsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meetingRoomsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
  

    useEffect(() => {
        // server call by queryParams
        dispatch(projectsActions.fetchAllProjects);
        dispatch(customersActions.fetchAllCustomers);
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
                openEditMeetingRoomDialog: meetingRoomsUIProps.openEditMeetingRoomDialog,
                openEditMeetingRoomInRoleDialog: meetingRoomsUIProps.openEditMeetingRoomInRoleDialog,
                openDeleteMeetingRoomDialog: meetingRoomsUIProps.openDeleteMeetingRoomDialog,
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
        sizePerPage: meetingRoomsUIProps.queryParams.pageSize,
        page: meetingRoomsUIProps.queryParams.pageNumber,
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
                                    meetingRoomsUIProps.setQueryParams
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
