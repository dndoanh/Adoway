import React from "react";
import { Route } from "react-router-dom";
import { MeetingRoomsLoadingDialog } from "./meetingrooms-loading-dialog/MeetingRoomsLoadingDialog";
import { MeetingRoomEditDialog } from "./meetingroom-edit-dialog/MeetingRoomEditDialog";
import { MeetingRoomDeleteDialog } from "./meetingroom-delete-dialog/MeetingRoomDeleteDialog";
import { MeetingRoomsUIProvider } from "./MeetingRoomsUIContext";
import { MeetingRoomsCard } from "./MeetingRoomsCard";

export function MeetingRoomsPage({ history }) {
    const meetingRoomsUIEvents = {
        newMeetingRoomButtonClick: () => {
            history.push("/meeting-rooms/new");
        },
        openEditMeetingRoomDialog: (id) => {
            history.push(`/meeting-rooms/${id}/edit`);
        },
        openDeleteMeetingRoomDialog: (id) => {
            history.push(`/meeting-rooms/${id}/delete`);
        },
    }

    return (
        <MeetingRoomsUIProvider meetingRoomsUIEvents={meetingRoomsUIEvents}>
            <MeetingRoomsLoadingDialog />
            <Route path="/meeting-rooms/new">
                {({ history, match }) => (
                    <MeetingRoomEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/meeting-rooms");
                        }}
                    />
                )}
            </Route>
            <Route path="/meeting-rooms/:id/edit">
                {({ history, match }) => (
                    <MeetingRoomEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/meeting-rooms");
                        }}
                    />
                )}
            </Route>
            <Route path="/meeting-rooms/:id/delete">
                {({ history, match }) => (
                    <MeetingRoomDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/meeting-rooms");
                        }}
                    />
                )}
            </Route>
            <MeetingRoomsCard />
        </MeetingRoomsUIProvider>
    );
}
