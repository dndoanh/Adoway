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
import { shallowEqual, useSelector } from "react-redux";

export function SuppliersCard() {
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      newSupplierButtonClick: suppliersUIContext.newSupplierButtonClick,
    };
  }, [suppliersUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddSupplier = user.functions.find(x => x.code == "CreateSupplier")
  return (
    <Card>
      <CardHeader title="Suppliers list">
        <CardHeaderToolbar>
            {
                user.isSuperAdmin || (AddSupplier &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={suppliersUIProps.newSupplierButtonClick}
                >
                    New Supplier
                 </button>
                )
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SuppliersFilter />
        <SuppliersTable />
      </CardBody>
    </Card>
  );
}
