import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./MeetingRoomsUIHelpers";

const MeetingRoomsUIContext = createContext();

export function useMeetingRoomsUIContext() {
    return useContext(MeetingRoomsUIContext);
}

export const MeetingRoomsUIConsumer = MeetingRoomsUIContext.Consumer;

export function MeetingRoomsUIProvider({ meetingRoomsUIEvents, children }) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const setQueryParams = useCallback(nextQueryParams => {
        setQueryParamsBase(prevQueryParams => {
            if (isFunction(nextQueryParams)) {
                nextQueryParams = nextQueryParams(prevQueryParams);
            }

            if (isEqual(prevQueryParams, nextQueryParams)) {
                return prevQueryParams;
            }

            return nextQueryParams;
        });
    }, []);

    const initMeetingRoom = {
        id: undefined,
        name: "",
        email: "",
        languageId: undefined,
        status: 0,
        avatarUrl: null
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        setQueryParams,
        initMeetingRoom,
        newMeetingRoomButtonClick: meetingRoomsUIEvents.newMeetingRoomButtonClick,
        newMeetingRoomInRolesButtonClick: meetingRoomsUIEvents.newMeetingRoomInRolesButtonClick,
        openEditMeetingRoomDialog: meetingRoomsUIEvents.openEditMeetingRoomDialog,
        openDeleteMeetingRoomDialog: meetingRoomsUIEvents.openDeleteMeetingRoomDialog,
        openEditMeetingRoomInRoleDialog: meetingRoomsUIEvents.openEditMeetingRoomInRoleDialog,
        openDeleteMeetingRoomInRolesDialog: meetingRoomsUIEvents.openDeleteMeetingRoomInRolesDialog,
    };

    return <MeetingRoomsUIContext.Provider value={value}>{children}</MeetingRoomsUIContext.Provider>;
}