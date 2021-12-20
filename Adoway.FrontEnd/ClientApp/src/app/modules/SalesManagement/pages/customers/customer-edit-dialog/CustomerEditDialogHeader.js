import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

export function CustomerEditDialogHeader({ id }) {
  // Customers Redux state
  const { customerForEdit, actionsLoading } = useSelector(
    (state) => ({
      customerForEdit: state.customers.customerForEdit,
      actionsLoading: state.customers.actionsLoading,
    }),
    shallowEqual
  );


  const [title, setTitle] = useState("");
  // Title couting

    const intl = useIntl()
    const n_cus = intl.formatMessage({ id: "CUSTOMER.NEW_CUSTOMER" })
    const e_cus = intl.formatMessage({ id: "CUSTOMER.EDIT_CUSTOMER" })

  useEffect(() => {
      let _title = id ? "" : n_cus;
    if (customerForEdit && id) {
        _title = `${e_cus} '${customerForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
