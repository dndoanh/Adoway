import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
export function RoleEditDialogHeader({ id }) {
  // Roles Redux state
  const { roleForEdit, actionsLoading } = useSelector(
    (state) => ({
      roleForEdit: state.roles.roleForEdit,
      actionsLoading: state.roles.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
    const intl = useIntl()
    const n_role = intl.formatMessage({ id: "ROLE.NEW_ROLE" })
    const e_role = intl.formatMessage({ id: "ROLE.EDIT_ROLE" })
  useEffect(() => {
      let _title = id ? "" : n_role;
    if (roleForEdit && id) {
        _title = `${e_role} '${roleForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [roleForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
