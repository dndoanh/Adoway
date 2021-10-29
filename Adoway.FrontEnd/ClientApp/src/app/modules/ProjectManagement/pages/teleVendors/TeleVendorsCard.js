import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { TeleVendorsFilter } from "./teleVendor-filter/TeleVendorsFilter";
import { TeleVendorsTable } from "./teleVendor-table/TeleVendorsTable";
import { useTeleVendorsUIContext } from "./TeleVendorsUIContext";

export function TeleVendorsCard() {
  const teleVendorsUIContext = useTeleVendorsUIContext();
  const teleVendorsUIProps = useMemo(() => {
    return {
      newTeleVendorButtonClick: teleVendorsUIContext.newTeleVendorButtonClick,
    };
  }, [teleVendorsUIContext]);

  return (
    <Card>
      <CardHeader title="TeleVendors list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={teleVendorsUIProps.newTeleVendorButtonClick}
          >
            New TeleVendor
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TeleVendorsFilter />
        <TeleVendorsTable />
      </CardBody>
    </Card>
  );
}
