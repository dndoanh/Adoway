import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

export function SupplierEditDialogHeader({ id }) {
  // Suppliers Redux state
  const { supplierForEdit, actionsLoading } = useSelector(
    (state) => ({
      supplierForEdit: state.suppliers.supplierForEdit,
      actionsLoading: state.suppliers.actionsLoading,
    }),
    shallowEqual
  );
    const intl = useIntl()
    const new_s = intl.formatMessage({ id: "PURCHASE.SUPPLIER.NEW_SUPPLIER" })
    const edit_s = intl.formatMessage({ id: "PURCHASE.SUPPLIER.EDIT_SUPPLIER" })

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
      let _title = id ? "" : new_s;
    if (supplierForEdit && id) {
        _title = `${edit_s} supplier '${supplierForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [supplierForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
