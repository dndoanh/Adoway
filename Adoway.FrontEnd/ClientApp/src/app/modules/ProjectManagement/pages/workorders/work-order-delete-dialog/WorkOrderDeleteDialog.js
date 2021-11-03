import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/workorders/workOrdersActions";
import {useWorkOrdersUIContext} from "../WorkOrdersUIContext";

export function WorkOrderDeleteDialog({ id, show, onHide }) {
  // WorkOrders UI Context
  const workOrdersUIContext = useWorkOrdersUIContext();
  const workOrdersUIProps = useMemo(() => {
    return {
      setIds: workOrdersUIContext.setIds,
      queryParams: workOrdersUIContext.queryParams
    };
  }, [workOrdersUIContext]);

  // WorkOrders Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.workorders.actionsLoading }),
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

  const deleteWorkOrder = () => {
    // server request for deleting workOrder by id
    dispatch(actions.deleteWorkOrder(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchWorkOrders(workOrdersUIProps.queryParams));
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
          WorkOrder Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this workOrder?</span>
        )}
        {isLoading && <span>WorkOrder is deleting...</span>}
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
            onClick={deleteWorkOrder}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
