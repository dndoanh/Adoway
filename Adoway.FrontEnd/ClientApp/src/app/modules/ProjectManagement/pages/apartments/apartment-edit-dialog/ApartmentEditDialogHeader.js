import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

export function ApartmentEditDialogHeader({ id }) {
  // Apartments Redux state
  const { apartmentForEdit, actionsLoading } = useSelector(
    (state) => ({
      apartmentForEdit: state.apartments.apartmentForEdit,
      actionsLoading: state.apartments.actionsLoading,
    }),
    shallowEqual
  );
    const intl = useIntl()
    const n_apartment = intl.formatMessage({ id: "PROJECT.APARTMENT.NEW_APARTMENT" })
    const e_apartment = intl.formatMessage({ id: "PROJECT.APARTMENT.EDIT_APARTMENT" })
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
      let _title = id ? "" : n_apartment;
    if (apartmentForEdit && id) {
        _title = `${e_apartment} '${apartmentForEdit.name}'`;
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
