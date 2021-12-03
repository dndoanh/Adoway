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

export function SubscriptionsCard() {
  const subscriptionsUIContext = useSubscriptionsUIContext();
  const subscriptionsUIProps = useMemo(() => {
    return {
      newSubscriptionButtonClick: subscriptionsUIContext.newSubscriptionButtonClick,
    };
  }, [subscriptionsUIContext]);
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddSubscription = user.functions.find(x => x.code == "CreateSubscription")
  return (
    <Card>
      <CardHeader title="Subscriptions list">
        <CardHeaderToolbar>
        {
             user.isSuperAdmin || (AddSubscription &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={subscriptionsUIProps.newSubscriptionButtonClick}
            >
                New SubScription
            </button>
            )
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
