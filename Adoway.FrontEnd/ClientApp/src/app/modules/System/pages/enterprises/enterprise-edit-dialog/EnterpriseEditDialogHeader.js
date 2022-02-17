import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

export function EnterpriseEditDialogHeader({ id }) {
  // Enterprises Redux state
  const { enterpriseForEdit, actionsLoading } = useSelector(
    (state) => ({
      enterpriseForEdit: state.enterprises.enterpriseForEdit,
      actionsLoading: state.enterprises.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
    const intl = useIntl()
    const n_enterprise = intl.formatMessage({ id: "ENTERPRISE.NEW_ENTERPRISE" })
    const e_enterprise = intl.formatMessage({ id: "ENTERPRISE.EDIT_ENTERPRISE" })
  useEffect(() => {
      let _title = id ? "" : n_enterprise;
    if (enterpriseForEdit && id) {
        _title = `${e_enterprise} '${enterpriseForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [enterpriseForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
