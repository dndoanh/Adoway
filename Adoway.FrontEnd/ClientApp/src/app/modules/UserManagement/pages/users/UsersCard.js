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
import { FormattedMessage, useIntl } from 'react-intl';
export function UsersCard() {
    const usersUIContext = useUsersUIContext();
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const AddUser = user.functions.find(x => x.code =="CreateUser")
  const usersUIProps = useMemo(() => {
    return {
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);
    const intl = useIntl()
    const list = intl.formatMessage({ id: "USER.USER_LIST" })
  return (
    <Card>
          <CardHeader title={list}>
        <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddUser) &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={usersUIProps.newUserButtonClick}
                >
                        <FormattedMessage
                            id="USER.NEW_USER"
                        />
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
