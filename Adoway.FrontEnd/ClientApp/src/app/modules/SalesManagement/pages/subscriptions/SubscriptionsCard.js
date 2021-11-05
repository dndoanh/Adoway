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

export function SubscriptionsCard() {
  const subscriptionsUIContext = useSubscriptionsUIContext();
  const subscriptionsUIProps = useMemo(() => {
    return {
      newSubscriptionButtonClick: subscriptionsUIContext.newSubscriptionButtonClick,
    };
  }, [subscriptionsUIContext]);

  return (
    <Card>
      <CardHeader title="Subscriptions list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={subscriptionsUIProps.newSubscriptionButtonClick}
          >
            New Work Order
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SubscriptionsFilter />
        <SubscriptionsTable />
      </CardBody>
    </Card>
  );
}
