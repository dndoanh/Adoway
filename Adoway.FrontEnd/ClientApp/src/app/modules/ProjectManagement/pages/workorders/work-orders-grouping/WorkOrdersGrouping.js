import React, { useMemo } from "react";
import { useWorkOrdersUIContext } from "../WorkOrdersUIContext";

export function WorkOrdersGrouping() {
  // WorkOrders UI Context
  const productsUIContext = useWorkOrdersUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      openDeleteWorkOrdersDialog: productsUIContext.openDeleteWorkOrdersDialog,
      openFetchWorkOrdersDialog: productsUIContext.openFetchWorkOrdersDialog,
      openUpdateWorkOrdersStatusDialog:
        productsUIContext.openUpdateWorkOrdersStatusDialog,
    };
  }, [productsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{productsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={productsUIProps.openDeleteWorkOrdersDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={productsUIProps.openFetchWorkOrdersDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={productsUIProps.openUpdateWorkOrdersStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
