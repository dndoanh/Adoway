import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { WorkOrdersFilter } from "./work-orders-filter/WorkOrdersFilter";
import { WorkOrdersTable } from "./work-orders-table/WorkOrdersTable";
import { useWorkOrdersUIContext } from "./WorkOrdersUIContext";
import { shallowEqual, useSelector } from "react-redux";

export function WorkOrdersCard() {
  const workOrdersUIContext = useWorkOrdersUIContext();
  const workOrdersUIProps = useMemo(() => {
    return {
      newWorkOrderButtonClick: workOrdersUIContext.newWorkOrderButtonClick,
    };
  }, [workOrdersUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddWorkOrder= user.functions.find(x => x.code == "CreateWorkOrder")
  return (
    <Card>
      <CardHeader title="WorkOrders list">
        <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddWorkOrder) &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={workOrdersUIProps.newWorkOrderButtonClick}
                >
                    New Work Order
                </button>
            }
       
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <WorkOrdersFilter />
        <WorkOrdersTable />
      </CardBody>
    </Card>
  );
}
