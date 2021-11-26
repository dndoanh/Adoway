import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { UsersFilter } from "./users-filter/UsersFilter";
import { UsersTable } from "./users-table/UsersTable";
import { useUsersUIContext } from "./UsersUIContext";
import { shallowEqual, useSelector } from "react-redux";

export function UsersCard() {
    const usersUIContext = useUsersUIContext();
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const AddUser = user.functions.find(x => x.code =="CreateUser")
  const usersUIProps = useMemo(() => {
    return {
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);

  return (
    <Card>
      <CardHeader title="Users list">
        <CardHeaderToolbar>
            {
                AddUser &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={usersUIProps.newUserButtonClick}
                >
                    New User
                </button>
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersFilter />
        <UsersTable />
      </CardBody>
    </Card>
  );
}
