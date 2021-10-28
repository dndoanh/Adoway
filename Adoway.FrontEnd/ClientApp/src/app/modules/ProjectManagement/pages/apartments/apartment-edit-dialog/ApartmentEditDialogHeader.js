import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ApartmentEditDialogHeader({ id }) {
  // Apartments Redux state
  const { apartmentForEdit, actionsLoading } = useSelector(
    (state) => ({
      apartmentForEdit: state.apartments.apartmentForEdit,
      actionsLoading: state.apartments.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Apartment";
    if (apartmentForEdit && id) {
      _title = `Edit apartment '${apartmentForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [apartmentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
