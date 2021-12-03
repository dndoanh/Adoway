import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { OwnersFilter } from "./owner-filter/OwnersFilter";
import { OwnersTable } from "./owner-table/OwnersTable";
import { useOwnersUIContext } from "./OwnersUIContext";
import { shallowEqual, useSelector } from "react-redux";

export function OwnersCard() {
  const ownersUIContext = useOwnersUIContext();
  const ownersUIProps = useMemo(() => {
    return {
      newOwnerButtonClick: ownersUIContext.newOwnerButtonClick,
    };
  }, [ownersUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddOwner = user.functions.find(x => x.code == "CreateOwner")
  return (
    <Card>
          <CardHeader title="Owners list">
              {
                  user.isSuperAdmin || (AddOwner &&
                      <CardHeaderToolbar>
                          <button
                              type="button"
                              className="btn btn-primary"
                              onClick={ownersUIProps.newOwnerButtonClick}
                          >
                              New Owner
                          </button>
                      </CardHeaderToolbar>
                  )
              }
       
      </CardHeader>
      <CardBody>
        <OwnersFilter />
        <OwnersTable />
      </CardBody>
    </Card>
  );
}
