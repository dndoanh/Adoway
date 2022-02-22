import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';

export function LanguageEditDialogHeader({ id }) {
  // Languages Redux state
  const { languageForEdit, actionsLoading } = useSelector(
    (state) => ({
      languageForEdit: state.languages.languageForEdit,
      actionsLoading: state.languages.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting

    const intl = useIntl()
    const n_lang = intl.formatMessage({ id: "LANGUAGE.NEW_LANGUAGE" })
    const e_lang = intl.formatMessage({ id: "LANGUAGE.EDIT_LANGUAGE" })
  useEffect(() => {
      let _title = id ? "" : n_lang ;
    if (languageForEdit && id) {
        _title = `${e_lang} '${languageForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [languageForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
