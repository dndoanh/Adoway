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
import { FormattedMessage, useIntl } from 'react-intl';

export function WorkOrdersCard() {
  const workOrdersUIContext = useWorkOrdersUIContext();
  const workOrdersUIProps = useMemo(() => {
    return {
      newWorkOrderButtonClick: workOrdersUIContext.newWorkOrderButtonClick,
    };
  }, [workOrdersUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddWorkOrder = user.functions.find(x => x.code == "CreateWorkOrder")

    const intl = useIntl()
    const list = intl.formatMessage({ id: "WORK_ORDER.LIST" })
  return (
    <Card>
        <CardHeader title={list}>
        <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddWorkOrder) &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={workOrdersUIProps.newWorkOrderButtonClick}
                >
                          <FormattedMessage
                              id="WORK_ORDER.NEW"
                          />
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
