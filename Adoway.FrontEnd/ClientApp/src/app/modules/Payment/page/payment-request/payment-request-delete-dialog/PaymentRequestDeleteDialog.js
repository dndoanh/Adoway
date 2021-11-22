import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/payment-request/paymentRequestsActions";
import {usePaymentRequestsUIContext} from "../PaymentRequestsUIContext";

export function PaymentRequestDeleteDialog({ id, show, onHide }) {
  // PaymentRequests UI Context
  const paymentRequestsUIContext = usePaymentRequestsUIContext();
  const paymentRequestsUIProps = useMemo(() => {
    return {
      setIds: paymentRequestsUIContext.setIds,
      queryParams: paymentRequestsUIContext.queryParams
    };
  }, [paymentRequestsUIContext]);

  // PaymentRequests Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.paymentRequests.actionsLoading }),
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

  const deletePaymentRequest = () => {
    // server request for deleting paymentRequest by id
    dispatch(actions.deletePaymentRequest(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPaymentRequests(paymentRequestsUIProps.queryParams));
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
          PaymentRequest Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this paymentRequest?</span>
        )}
        {isLoading && <span>PaymentRequest is deleting...</span>}
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
            onClick={deletePaymentRequest}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
