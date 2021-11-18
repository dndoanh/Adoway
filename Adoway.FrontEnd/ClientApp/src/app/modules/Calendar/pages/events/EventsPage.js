import React from "react";
import { Route } from "react-router-dom";
import { EventsLoadingDialog } from "./events-loading-dialog/EventsLoadingDialog";
import { EventsUIProvider } from "./EventsUIContext";
import { EventsCard } from "./EventsCard";
import { ContentRoute } from "../../../../../_metronic/layout";
import { EventEditDialog } from "./event-edit-dialog/EventEditDialog";
import { EventDetailDialog } from "./event-detail-dialog/EventDetailDialog";
export function EventsPage({ history }) {
    const eventsUIEvents = {
        openNewPage: ({ start, end, id }) => {
            if (id) {
                history.push(`/events/${id}/edit`);
            }
            else {
                history.push(`/events/${start}/${end}/new`);
            }
        },
        openNewDetailPage: ({ start, end }) => {
            history.push(`/events/${start}/${end}/new-detail`);
        },
        openDetailPage: ({ id }) => {
            debugger;
            history.push(`/events/${id}/detail`);
        },
        openEditPage: ({ id }) => {
            history.push(`/events/${id}/edit`);
     /*       history.push(`/events/${start}/${end}/new`);*/
        },
        openDeleteEventDialog: (id) => {
            history.push(`/events/${id}/delete`);
        },
        openCalendar: () => {
            history.push("/events/calendar");
        },
    }

    return (
        <EventsUIProvider eventsUIEvents={eventsUIEvents}>
            <EventsLoadingDialog />
            <Route path="/events/:start/:end/new">
                {({ history, match }) => (
                    <EventEditDialog
                        show={match != null}
                        start={match && match.params.start}
                        end={match && match.params.end}
                        onHide={() => {
                            history.push("/events");
                        }}
                    />
                )}
            </Route>
            <Route path="/events/:start/:end/new-detail">
                {({ history, match }) => (
                    <EventDetailDialog
                        show={match != null}
                        start={match && match.params.start}
                        end={match && match.params.end}
                        onHide={() => {
                            history.push("/events");
                        }}
                    />
                )}
            </Route>
            <Route path="/events/:id/detail">
                {({ history, match }) => (
                    <EventDetailDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/events");
                        }}
                    />
                )}
            </Route>
            <Route path="/events/:id/edit">
                {({ history, match }) => (
                    <EventEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/events");
                        }}
                    />
                )}
            </Route>
            <EventsCard />
        </EventsUIProvider>
    );
}
