import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
export function UserEditDialogHeader({ id }) {
  // Users Redux state
  const { userForEdit, actionsLoading } = useSelector(
    (state) => ({
      userForEdit: state.users.userForEdit,
      actionsLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
    const intl = useIntl()
    const n_user = intl.formatMessage({ id: "USER.NEW_USER" })
    const e_user = intl.formatMessage({ id: "USER.EDIT_USER" })
  useEffect(() => {
      let _title = id ? "" : n_user;
    if (userForEdit && id) {
        _title = `${e_user} '${userForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [userForEdit, actionsLoading]);

  
  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
