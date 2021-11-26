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
import { shallowEqual, useSelector } from "react-redux";

export function ApartmentsCard() {
  const apartmentsUIContext = useApartmentsUIContext();
  const apartmentsUIProps = useMemo(() => {
    return {
      newApartmentButtonClick: apartmentsUIContext.newApartmentButtonClick,
    };
  }, [apartmentsUIContext]);


    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddApartment = user.functions.find(x => x.code == "CreateApartment")
  return (
    <Card>
      <CardHeader title="Apartments list">
         <CardHeaderToolbar>
            {AddApartment &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={apartmentsUIProps.newApartmentButtonClick}
                >
                    New Apartment
                </button>
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ApartmentsFilter />
        <ApartmentsTable />
      </CardBody>
    </Card>
  );
}
