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
import { FormattedMessage, useIntl } from 'react-intl';
export function MeetingRoomsCard() {
  const meetingRoomsUIContext = useMeetingRoomsUIContext();
  const meetingRoomsUIProps = useMemo(() => {
    return {
      newMeetingRoomButtonClick: meetingRoomsUIContext.newMeetingRoomButtonClick,
    };
  }, [meetingRoomsUIContext]);

    const intl = useIntl()
    const roomList = intl.formatMessage({ id: "CALENDAR.ROOM.ROOM_LIST" })
  return (
    <Card>
          <CardHeader title={roomList}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={meetingRoomsUIProps.newMeetingRoomButtonClick}
          >
            <FormattedMessage
                id="CALENDAR.ROOMS.NEW_ROOM"
            />
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
