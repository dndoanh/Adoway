import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EmployeesFilter } from "./employees-filter/EmployeesFilter";
import { EmployeesTable } from "./employees-table/EmployeesTable";
import { useEmployeesUIContext } from "./EmployeesUIContext";

export function EmployeesCard() {
  const employeesUIContext = useEmployeesUIContext();
  const employeesUIProps = useMemo(() => {
    return {
      newEmployeeButtonClick: employeesUIContext.newEmployeeButtonClick,
    };
  }, [employeesUIContext]);

  return (
    <Card>
      <CardHeader title="Employees list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeesUIProps.newEmployeeButtonClick}
          >
            New Employee
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeesFilter />
        <EmployeesTable />
      </CardBody>
    </Card>
  );
}
