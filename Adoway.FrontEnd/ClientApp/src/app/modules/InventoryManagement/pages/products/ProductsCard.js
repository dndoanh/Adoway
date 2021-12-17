import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductsFilter } from "./products-filter/ProductsFilter";
import { ProductsTable } from "./products-table/ProductsTable";
import { useProductsUIContext } from "./ProductsUIContext";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, useIntl} from 'react-intl';

export function ProductsCard() {
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      newProductButtonClick: productsUIContext.newProductButtonClick,
    };
  }, [productsUIContext]);

const user = useSelector(({ auth }) => auth.user, shallowEqual)
const AddProduct = user.functions.find(x => x.code == "CreateProducts")
const intl = useIntl()
    const listTitle = intl.formatMessage({ id: "SALES.INVOICES.INVOICENO" })
  return (
    <Card>
     <CardHeader title={listTitle}>
        <CardHeaderToolbar>
        {user.isSuperAdmin || (AddProduct &&
            <button
                type="button"
                className="btn btn-primary"
                onClick={productsUIProps.newProductButtonClick}
            >
                    <FormattedMessage
                        id="INVENTORY.PRODUCTS.NEW_PRODUCT"
                        defaultMessage="New Product"
                    />
            </button>
            )
        }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductsFilter />
        <ProductsTable />
      </CardBody>
    </Card>
  );
}
