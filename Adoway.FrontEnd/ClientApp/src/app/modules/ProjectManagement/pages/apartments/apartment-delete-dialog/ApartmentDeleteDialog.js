import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/apartments/apartmentsActions";
import {useApartmentsUIContext} from "../ApartmentsUIContext";

export function ApartmentDeleteDialog({ id, show, onHide }) {
  // Apartments UI Context
  const apartmentsUIContext = useApartmentsUIContext();
  const apartmentsUIProps = useMemo(() => {
    return {
      setIds: apartmentsUIContext.setIds,
      queryParams: apartmentsUIContext.queryParams
    };
  }, [apartmentsUIContext]);

  // Apartments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.apartments.actionsLoading }),
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

  const deleteApartment = () => {
    // server request for deleting apartment by id
    dispatch(actions.deleteApartment(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchApartments(apartmentsUIProps.queryParams));
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
          Apartment Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this apartment?</span>
        )}
        {isLoading && <span>Apartment is deleting...</span>}
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
            onClick={deleteApartment}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
