import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
export function OwnerEditDialogHeader({ id }) {
  // Owners Redux state
  const { ownerForEdit, actionsLoading } = useSelector(
    (state) => ({
      ownerForEdit: state.owners.ownerForEdit,
      actionsLoading: state.owners.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Owner";
    if (ownerForEdit && id) {
      _title = `Edit owner '${ownerForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ownerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
