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

export function CategoriesCard() {
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      newCategoryButtonClick: categoriesUIContext.newCategoryButtonClick,
    };
  }, [categoriesUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddCategories = user.functions.find(x => x.code == "CreateCategories")
  return (
    <Card>
      <CardHeader title="Categories list">
         <CardHeaderToolbar>
            {user.isSuperAdmin || (AddCategories &&
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={categoriesUIProps.newCategoryButtonClick}
                >
                New Category
                </button>
                )
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
