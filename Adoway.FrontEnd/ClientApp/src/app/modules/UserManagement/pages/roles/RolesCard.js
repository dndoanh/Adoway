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
import { shallowEqual, useSelector } from "react-redux";

export function RolesCard() {
  const rolesUIContext = useRolesUIContext();
  const rolesUIProps = useMemo(() => {
    return {
      newRoleButtonClick: rolesUIContext.newRoleButtonClick,
    };
  }, [rolesUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddRole = user.functions.find(x => x.code == "CreateRole")
  return (
    <Card>
      <CardHeader title="Roles list">
        <CardHeaderToolbar>
            {
                user.isSuperAdmin || (AddRole &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={rolesUIProps.newRoleButtonClick}
                >
                    New Role
                </button>
                 )
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolesFilter />
        <RolesTable />
      </CardBody>
    </Card>
  );
}
