import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/subscriptions/subscriptionsActions";
import {useSubscriptionsUIContext} from "../SubscriptionsUIContext";

export function SubscriptionDeleteDialog({ id, show, onHide }) {
  // Subscriptions UI Context
  const subscriptionsUIContext = useSubscriptionsUIContext();
  const subscriptionsUIProps = useMemo(() => {
    return {
      setIds: subscriptionsUIContext.setIds,
      queryParams: subscriptionsUIContext.queryParams
    };
  }, [subscriptionsUIContext]);

  // Subscriptions Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.subscriptions.actionsLoading }),
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

  const deleteSubscription = () => {
    // server request for deleting subscription by id
    dispatch(actions.deleteSubscription(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSubscriptions(subscriptionsUIProps.queryParams));
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
          Subscription Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this subscription?</span>
        )}
        {isLoading && <span>Subscription is deleting...</span>}
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
            onClick={deleteSubscription}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
