import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/languages/languagesActions";
import { LanguageEditDialogHeader } from "./LanguageEditDialogHeader";
import { LanguageEditForm } from "./LanguageEditForm";
import { useLanguagesUIContext } from "../LanguagesUIContext";

export function LanguageEditDialog({ id, show, onHide }) {
  // Languages UI Context
  const languagesUIContext = useLanguagesUIContext();
  const languagesUIProps = useMemo(() => {
    return {
      initLanguage: languagesUIContext.initLanguage,
    };
  }, [languagesUIContext]);

  // Languages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, languageForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.languages.actionsLoading,
      languageForEdit: state.languages.languageForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Language by id
    dispatch(actions.selectLanguage(id));
  }, [id, dispatch]);

  // server request for saving language
  const saveLanguage = (language) => {
    if (!id) {
      // server request for creating language
      dispatch(actions.createLanguage(language)).then(() => onHide());
    } else {
      // server request for updating language
      dispatch(actions.updateLanguage(language)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LanguageEditDialogHeader id={id} />
      <LanguageEditForm
        saveLanguage={saveLanguage}
        actionsLoading={actionsLoading}
        language={languageForEdit || languagesUIProps.initLanguage}
        onHide={onHide}
      />
    </Modal>
  );
}
