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
import { FormattedMessage, useIntl } from 'react-intl';

export function ApartmentsCard() {
  const apartmentsUIContext = useApartmentsUIContext();
  const apartmentsUIProps = useMemo(() => {
    return {
      newApartmentButtonClick: apartmentsUIContext.newApartmentButtonClick,
    };
  }, [apartmentsUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddApartment = user.functions.find(x => x.code == "CreateApartment")
    const intl = useIntl()
    const list = intl.formatMessage({ id: "PROJECT.APARTMENT.APARTMENT_LIST" })
  return (
    <Card>
      <CardHeader title={list}>
         <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddApartment) &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={apartmentsUIProps.newApartmentButtonClick}
                    >
                    <FormattedMessage
                        id="NEW_APARTMENT"
                    />
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
