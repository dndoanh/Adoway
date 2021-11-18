import React, { useMemo } from "react";
import { useInvoicesUIContext } from "../InvoicesUIContext";

export function InvoicesGrouping() {
  // Invoices UI Context
  const productsUIContext = useInvoicesUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      openDeleteInvoicesDialog: productsUIContext.openDeleteInvoicesDialog,
      openFetchInvoicesDialog: productsUIContext.openFetchInvoicesDialog,
      openUpdateInvoicesStatusDialog:
        productsUIContext.openUpdateInvoicesStatusDialog,
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
                onClick={productsUIProps.openDeleteInvoicesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={productsUIProps.openFetchInvoicesDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={productsUIProps.openUpdateInvoicesStatusDialog}
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
