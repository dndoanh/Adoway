import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EventsTable } from "./events-table/EventsTable";
import { useEventsUIContext } from "./EventsUIContext";
import { FormattedMessage, useIntl } from 'react-intl';

export function EventsCard() {
    const intl = useIntl()
    const eventList = intl.formatMessage({ id: "CALENDAR.EVENTS.EVENT_LIST" })
  return (
    <Card>
    <CardHeader title={eventList}>
        <CardHeaderToolbar>
         
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EventsTable />
      </CardBody>
    </Card>
  );
}
