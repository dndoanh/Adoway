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
import { shallowEqual, useSelector } from "react-redux";

export function ContractsCard() {
  const contractsUIContext = useContractsUIContext();
  const contractsUIProps = useMemo(() => {
    return {
      newContractButtonClick: contractsUIContext.newContractButtonClick,
    };
  }, [contractsUIContext]);

    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const AddContract = user.functions.find(x => x.code == "CreateContract")

  return (
    <Card>
      <CardHeader title="Contracts list">
        <CardHeaderToolbar>
            {
                (user.isSuperAdmin || AddContract) &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={contractsUIProps.newContractButtonClick}
                        >
                        New Contract
                    </button>
            }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContractsFilter />
        <ContractsTable />
      </CardBody>
    </Card>
  );
}
