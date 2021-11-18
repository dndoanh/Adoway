import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EventsTable } from "./events-table/EventsTable";
import { useEventsUIContext } from "./EventsUIContext";

export function EventsCard() {
  return (
    <Card>
      <CardHeader title="Event list">
        <CardHeaderToolbar>
         
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EventsTable />
      </CardBody>
    </Card>
  );
}
