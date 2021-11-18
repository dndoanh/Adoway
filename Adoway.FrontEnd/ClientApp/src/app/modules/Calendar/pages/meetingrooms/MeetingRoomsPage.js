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
            history.push("/meetingRooms/new");
        },
        newMeetingRoomInRolesButtonClick: () => {
            history.push("/meetingRooms/new-meetingRoom-in-roles");
        },
        openEditMeetingRoomDialog: (id) => {
            history.push(`/meetingRooms/${id}/edit`);
        },
        openEditMeetingRoomInRoleDialog: (id) => {
            history.push(`/meetingRooms/${id}/edit-role`);
        },
        openDeleteMeetingRoomDialog: (id) => {
            history.push(`/meetingRooms/${id}/delete`);
        },
        openDeleteMeetingRoomInRolesDialog: (id) => {
            history.push(`/meetingRooms/${id}/delete-meetingRoom-in-roles`);
        }
    }

    return (
        <MeetingRoomsUIProvider meetingRoomsUIEvents={meetingRoomsUIEvents}>
            <MeetingRoomsLoadingDialog />
            <Route path="/meetingRooms/new">
                {({ history, match }) => (
                    <MeetingRoomEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/meetingRooms");
                        }}
                    />
                )}
            </Route>
            <Route path="/meetingRooms/:id/edit">
                {({ history, match }) => (
                    <MeetingRoomEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/meetingRooms");
                        }}
                    />
                )}
            </Route>
            <Route path="/meetingRooms/:id/delete">
                {({ history, match }) => (
                    <MeetingRoomDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/meetingRooms");
                        }}
                    />
                )}
            </Route>
            <MeetingRoomsCard />
        </MeetingRoomsUIProvider>
    );
}
