import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CategoriesFilter } from "./category-filter/CategoriesFilter";
import { CategoriesTable } from "./category-table/CategoriesTable";
import { useCategoriesUIContext } from "./CategoriesUIContext";
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';
export function CategoriesCard() {
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      newCategoryButtonClick: categoriesUIContext.newCategoryButtonClick,
    };
  }, [categoriesUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddCategories = user.functions.find(x => x.code == "CreateCategories")
    const intl = useIntl()
    const list = intl.formatMessage({ id: "CATEGORIES.CATEGORIES_LIST" })
  return (
    <Card>
         <CardHeader title={list}>
         <CardHeaderToolbar>
            {(user.isSuperAdmin || AddCategories) &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={categoriesUIProps.newCategoryButtonClick}
                >
                      <FormattedMessage
                          id="CATEGORIES.NEW_CATEGORIES"
                      />
                </button>
                
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CategoriesFilter />
        <CategoriesTable />
      </CardBody>
    </Card>
  );
}
