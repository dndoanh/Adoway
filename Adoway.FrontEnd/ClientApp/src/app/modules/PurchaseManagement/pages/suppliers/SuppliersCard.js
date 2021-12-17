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
import { FormattedMessage, useIntl } from 'react-intl';

export function SuppliersCard() {
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      newSupplierButtonClick: suppliersUIContext.newSupplierButtonClick,
    };
  }, [suppliersUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddSupplier = user.functions.find(x => x.code == "CreateSupplier")
    const intl = useIntl()
    const list = intl.formatMessage({ id: "PURCHASE.SUPPLIER.SUPPLIER_LIST" })
  return (
    <Card>
          <CardHeader title={list}>
        <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddSupplier) &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={suppliersUIProps.newSupplierButtonClick}
                >
                <FormattedMessage
                    id="PURCHASE.SUPPLIER.NEW_SUPPLIER"
                />
                 </button>
                
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
