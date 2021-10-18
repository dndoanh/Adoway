import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/enterprises/enterprisesActions";
import {useEnterprisesUIContext} from "../EnterprisesUIContext";

export function EnterpriseDeleteDialog({ id, show, onHide }) {
  // Enterprises UI Context
  const enterprisesUIContext = useEnterprisesUIContext();
  const enterprisesUIProps = useMemo(() => {
    return {
      setIds: enterprisesUIContext.setIds,
      queryParams: enterprisesUIContext.queryParams
    };
  }, [enterprisesUIContext]);

  // Enterprises Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.enterprises.actionsLoading }),
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

  const deleteEnterprise = () => {
    // server request for deleting enterprise by id
    dispatch(actions.deleteEnterprise(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchEnterprises(enterprisesUIProps.queryParams));
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
          Enterprise Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this enterprise?</span>
        )}
        {isLoading && <span>Enterprise is deleting...</span>}
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
            onClick={deleteEnterprise}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
