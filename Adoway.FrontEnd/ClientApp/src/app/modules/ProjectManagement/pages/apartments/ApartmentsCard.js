import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ApartmentsFilter } from "./apartment-filter/ApartmentsFilter";
import { ApartmentsTable } from "./apartment-table/ApartmentsTable";
import { useApartmentsUIContext } from "./ApartmentsUIContext";

export function ApartmentsCard() {
  const apartmentsUIContext = useApartmentsUIContext();
  const apartmentsUIProps = useMemo(() => {
    return {
      newApartmentButtonClick: apartmentsUIContext.newApartmentButtonClick,
    };
  }, [apartmentsUIContext]);

  return (
    <Card>
      <CardHeader title="Apartments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={apartmentsUIProps.newApartmentButtonClick}
          >
            New Apartment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ApartmentsFilter />
        <ApartmentsTable />
      </CardBody>
    </Card>
  );
}
