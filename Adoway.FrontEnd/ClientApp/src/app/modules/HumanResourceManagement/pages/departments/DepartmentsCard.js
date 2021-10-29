import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DepartmentsFilter } from "./department-filter/DepartmentsFilter";
import { DepartmentsTable } from "./department-table/DepartmentsTable";
import { useDepartmentsUIContext } from "./DepartmentsUIContext";

export function DepartmentsCard() {
  const departmentsUIContext = useDepartmentsUIContext();
  const departmentsUIProps = useMemo(() => {
    return {
      newDepartmentButtonClick: departmentsUIContext.newDepartmentButtonClick,
    };
  }, [departmentsUIContext]);

  return (
    <Card>
      <CardHeader title="Departments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={departmentsUIProps.newDepartmentButtonClick}
          >
            New Department
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DepartmentsFilter />
        <DepartmentsTable />
      </CardBody>
    </Card>
  );
}
