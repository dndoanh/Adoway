import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { MeetingRoomsFilter } from "./meetingroom-filter/MeetingRoomsFilter";
import { MeetingRoomsTable } from "./meetingroom-table/MeetingRoomsTable";
import { useMeetingRoomsUIContext } from "./MeetingRoomsUIContext";

export function MeetingRoomsCard() {
  const meetingRoomsUIContext = useMeetingRoomsUIContext();
  const meetingRoomsUIProps = useMemo(() => {
    return {
      newMeetingRoomButtonClick: meetingRoomsUIContext.newMeetingRoomButtonClick,
    };
  }, [meetingRoomsUIContext]);

  return (
    <Card>
      <CardHeader title="Meeting Rooms list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={meetingRoomsUIProps.newMeetingRoomButtonClick}
          >
            New Meeting Room
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MeetingRoomsFilter />
        <MeetingRoomsTable />
      </CardBody>
    </Card>
  );
}
