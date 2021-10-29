import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/teleVendors/teleVendorsActions";
import {useTeleVendorsUIContext} from "../TeleVendorsUIContext";

export function TeleVendorDeleteDialog({ id, show, onHide }) {
  // TeleVendors UI Context
  const teleVendorsUIContext = useTeleVendorsUIContext();
  const teleVendorsUIProps = useMemo(() => {
    return {
      setIds: teleVendorsUIContext.setIds,
      queryParams: teleVendorsUIContext.queryParams
    };
  }, [teleVendorsUIContext]);

  // TeleVendors Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.teleVendors.actionsLoading }),
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

  const deleteTeleVendor = () => {
    // server request for deleting teleVendor by id
    dispatch(actions.deleteTeleVendor(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchTeleVendors(teleVendorsUIProps.queryParams));
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
          TeleVendor Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this teleVendor?</span>
        )}
        {isLoading && <span>TeleVendor is deleting...</span>}
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
            onClick={deleteTeleVendor}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
