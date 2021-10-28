import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/contracts/contractsActions";
import { ContractEditDialogHeader } from "./ContractEditDialogHeader";
import { ContractEditForm } from "./ContractEditForm";
import { useContractsUIContext } from "../ContractsUIContext";

export function ContractEditDialog({ id, show, onHide }) {
  // Contracts UI Context
  const contractsUIContext = useContractsUIContext();
  const contractsUIProps = useMemo(() => {
    return {
      initContract: contractsUIContext.initContract,
    };
  }, [contractsUIContext]);

  // Contracts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, contractForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.contracts.actionsLoading,
      contractForEdit: state.contracts.contractForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Contract by id
    dispatch(actions.selectContract(id));
  }, [id, dispatch]);

  // server request for saving contract
  const saveContract = (contract) => {
    if (!id) {
      // server request for creating contract
      dispatch(actions.createContract(contract)).then(() => onHide());
    } else {
      // server request for updating contract
      dispatch(actions.updateContract(contract)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ContractEditDialogHeader id={id} />
      <ContractEditForm
        saveContract={saveContract}
        actionsLoading={actionsLoading}
        contract={contractForEdit || contractsUIProps.initContract}
        onHide={onHide}
      />
    </Modal>
  );
}
