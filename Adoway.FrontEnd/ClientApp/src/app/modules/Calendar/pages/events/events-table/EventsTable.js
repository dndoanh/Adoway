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
    const { currentRoomState } = useSelector(
        (state) => ({ currentRoomState: state.meetingrooms}),
        shallowEqual
    );
    const { allMeetingRooms } = currentRoomState;

   
    const eventList = entities.map(e => ({
        id:e.id,
        title: e.title,
        start: new Date(Date.parse(e.startDate)),
        end: new Date(Date.parse(e.endDate)),
        roomId: e.meetingRoomId
    }))
    useEffect(() => {
        // server call by queryParams
        dispatch(usersActions.fetchAllUsers);
        dispatch(roomsActions.fetchAllMeetingRooms)
        dispatch(eventsActions.fetchEvents({ filter: { title: "" }, pageSize: 100, pageNumber: 1, sortOrder: "asc", sortField: "title" }))
       

    }, []);

    const eventPropGetter = (event) => {
        var color = allMeetingRooms.find(r => r.id == event.roomId).color;
        /*     var style = RoomColors[event.Room];*/
        var style ={
            backgroundColor: color,
            borderRadius: '0px',
            opacity: 0.8,
            color: "black",
            border: '0px',
            display: 'block'
        }
        return {
            style: style
        };
    }
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const Add = user.functions.find(x => x.code == "CreateEvent")
    const Edit = user.functions.find(x => x.code == "EditEvent")
    return (
        <>
            <BigCalendar
                events={eventList}
                onSelectSlot={!Add && eventUIProps.openNewPage}
                onSelectEvent={Edit && eventUIProps.openEditPage}
                eventPropGetter={eventPropGetter}
            />
        </>
    );
}
