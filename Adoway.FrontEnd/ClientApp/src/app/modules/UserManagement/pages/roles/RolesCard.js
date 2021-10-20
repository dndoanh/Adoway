import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { RolesFilter } from "./roles-filter/RolesFilter";
import { RolesTable } from "./roles-table/RolesTable";
import { useRolesUIContext } from "./RolesUIContext";

export function RolesCard() {
  const rolesUIContext = useRolesUIContext();
  const rolesUIProps = useMemo(() => {
    return {
      newRoleButtonClick: rolesUIContext.newRoleButtonClick,
    };
  }, [rolesUIContext]);

  return (
    <Card>
      <CardHeader title="Roles list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rolesUIProps.newRoleButtonClick}
          >
            New Role
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolesFilter />
        <RolesTable />
      </CardBody>
    </Card>
  );
}
