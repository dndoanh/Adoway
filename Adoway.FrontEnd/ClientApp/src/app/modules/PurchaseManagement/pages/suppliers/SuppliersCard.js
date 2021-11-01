import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SuppliersFilter } from "./supplier-filter/SuppliersFilter";
import { SuppliersTable } from "./supplier-table/SuppliersTable";
import { useSuppliersUIContext } from "./SuppliersUIContext";

export function SuppliersCard() {
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      newSupplierButtonClick: suppliersUIContext.newSupplierButtonClick,
    };
  }, [suppliersUIContext]);

  return (
    <Card>
      <CardHeader title="Suppliers list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={suppliersUIProps.newSupplierButtonClick}
          >
            New Supplier
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SuppliersFilter />
        <SuppliersTable />
      </CardBody>
    </Card>
  );
}
