import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
/*import * as dates from '../../src/utils/dates'*/
import moment from 'moment'


const localizer = momentLocalizer(moment)

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        //style: {
        //    backgroundColor: 'lightorange',
        //},
    })
export function BigCalendar(
    {
        events,
        onSelectSlot,
        onSelectEvent,
        eventPropGetter
    }) {
    return(
    <Calendar
            events={events}
            views={allViews}
            step={60}
            showMultiDayTimes
            /*      max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}*/
            defaultDate={new Date(2015, 3, 1)}
            components={{
                timeSlotWrapper: ColoredDateCellWrapper,
            }}
            defaultView={Views.WEEK}
            selectable
            localizer={localizer}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            eventPropGetter={eventPropGetter}
            culture='vi-VN'
    />
    )
}