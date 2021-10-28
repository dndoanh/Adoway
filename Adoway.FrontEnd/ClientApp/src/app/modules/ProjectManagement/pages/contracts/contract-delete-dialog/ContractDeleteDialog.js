import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/contracts/contractsActions";
import {useContractsUIContext} from "../ContractsUIContext";

export function ContractDeleteDialog({ id, show, onHide }) {
  // Contracts UI Context
  const contractsUIContext = useContractsUIContext();
  const contractsUIProps = useMemo(() => {
    return {
      setIds: contractsUIContext.setIds,
      queryParams: contractsUIContext.queryParams
    };
  }, [contractsUIContext]);

  // Contracts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.contracts.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteContract = () => {
    // server request for deleting contract by id
    dispatch(actions.deleteContract(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchContracts(contractsUIProps.queryParams));
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Contract Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this contract?</span>
        )}
        {isLoading && <span>Contract is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteContract}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
