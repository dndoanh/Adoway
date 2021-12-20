import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
export function CategoryEditDialogHeader({ id }) {
  // Categories Redux state
  const { categoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      categoryForEdit: state.categories.categoryForEdit,
      actionsLoading: state.categories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
    const intl = useIntl()
    const n_category = intl.formatMessage({ id: "CATEGORIES.NEW_CATEGORIES" })
    const e_category = intl.formatMessage({ id: "CATEGORIES.EDIT_CATEGORIES" })
  useEffect(() => {
      let _title = id ? "" : n_category;
    if (categoryForEdit && id) {
        _title = `${e_category} '${categoryForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [categoryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
