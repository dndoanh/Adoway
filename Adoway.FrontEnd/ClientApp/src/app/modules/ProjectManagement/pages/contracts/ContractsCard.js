import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ContractsFilter } from "./contract-filter/ContractsFilter";
import { ContractsTable } from "./contract-table/ContractsTable";
import { useContractsUIContext } from "./ContractsUIContext";

export function ContractsCard() {
  const contractsUIContext = useContractsUIContext();
  const contractsUIProps = useMemo(() => {
    return {
      newContractButtonClick: contractsUIContext.newContractButtonClick,
    };
  }, [contractsUIContext]);

  return (
    <Card>
      <CardHeader title="Contracts list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={contractsUIProps.newContractButtonClick}
          >
            New Contract
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContractsFilter />
        <ContractsTable />
      </CardBody>
    </Card>
  );
}
