import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SubscriptionsFilter } from "./subscriptions-filter/SubscriptionsFilter";
import { SubscriptionsTable } from "./subscriptions-table/SubscriptionsTable";
import { useSubscriptionsUIContext } from "./SubscriptionsUIContext";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';
export function SubscriptionsCard() {
  const subscriptionsUIContext = useSubscriptionsUIContext();
  const subscriptionsUIProps = useMemo(() => {
    return {
      newSubscriptionButtonClick: subscriptionsUIContext.newSubscriptionButtonClick,
    };
  }, [subscriptionsUIContext]);
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddSubscription = user.functions.find(x => x.code == "CreateSubscription")

    const intl = useIntl()
    const list = intl.formatMessage({ id: "SALES.SUBS.SUBS_LIST" })
  return (
    <Card>
          <CardHeader title={list}>
        <CardHeaderToolbar>
        {
             (user.isSuperAdmin || AddSubscription) &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={subscriptionsUIProps.newSubscriptionButtonClick}
            >
            <FormattedMessage
                id="SALES.SUBS.NEW_SUBS"
            />
            </button>
            
        }
       
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SubscriptionsFilter />
        <SubscriptionsTable />
      </CardBody>
    </Card>
  );
}
