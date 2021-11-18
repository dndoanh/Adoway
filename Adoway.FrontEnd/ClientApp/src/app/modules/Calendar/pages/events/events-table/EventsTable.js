import React, { useEffect, useMemo} from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { BigCalendar } from "../../../../../../_metronic/_partials/controls";
import { useEventsUIContext } from "../EventsUIContext";
import { RoomColors } from "../EventsUIHelpers";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
import * as roomsActions from "../../../../Calendar/_redux/meetingrooms/meetingRoomsActions";
import * as eventsActions from "../../../../Calendar/_redux/events/eventsActions";
import moment from 'moment'

export function EventsTable() {
    const eventsUIContext = useEventsUIContext();
    const dispatch = useDispatch();
    const eventUIProps = useMemo(() => {
        return {
            openNewPage: eventsUIContext.openNewPage,
            openDetailPage: eventsUIContext.openDetailPage,
            openNewDetailPage: eventsUIContext.openNewDetailPage,
            openEditPage: eventsUIContext.openEditPage,
        };
    }, [eventsUIContext]);

    const { currentState } = useSelector(
        (state) => ({ currentState: state.events }),
        shallowEqual
    );
    const { entities } = currentState;
    const eventList = entities.map(e => ({
        id:e.id,
        title: e.title,
        start: new Date(Date.parse(e.startDate)),
        end: new Date(Date.parse(e.endDate)),
    }))
    useEffect(() => {
        // server call by queryParams
        dispatch(usersActions.fetchAllUsers);
        dispatch(roomsActions.fetchAllMeetingRooms)
        dispatch(eventsActions.fetchEvents({ filter: { title: "" }, pageSize:100,pageNumber:1,sortOrder:"asc", sortField:"title"}))
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventPropGetter = ( event ) => {
        var style = RoomColors[event.Room];
        return {
            style: style
        };
    }
    return (
        <>
            <BigCalendar
                events={eventList}
                onSelectSlot={eventUIProps.openNewDetailPage}
                onSelectEvent={eventUIProps.openDetailPage}
                eventPropGetter={eventPropGetter}
            />
        </>
    );
}
