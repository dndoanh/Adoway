import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/enterprises/enterprisesActions";
import { EnterpriseEditDialogHeader } from "./EnterpriseEditDialogHeader";
import { EnterpriseEditForm } from "./EnterpriseEditForm";
import { useEnterprisesUIContext } from "../EnterprisesUIContext";

export function EnterpriseEditDialog({ id, show, onHide }) {
  // Enterprises UI Context
  const enterprisesUIContext = useEnterprisesUIContext();
  const enterprisesUIProps = useMemo(() => {
    return {
      initEnterprise: enterprisesUIContext.initEnterprise,
    };
  }, [enterprisesUIContext]);

  // Enterprises Redux state
  const dispatch = useDispatch();
  const { actionsLoading, enterpriseForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.enterprises.actionsLoading,
      enterpriseForEdit: state.enterprises.enterpriseForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Enterprise by id
    dispatch(actions.selectEnterprise(id));
  }, [id, dispatch]);

  // server request for saving enterprise
  const saveEnterprise = (enterprise) => {
    if (!id) {
      // server request for creating enterprise
      dispatch(actions.createEnterprise(enterprise)).then(() => onHide());
    } else {
      // server request for updating enterprise
      dispatch(actions.updateEnterprise(enterprise)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EnterpriseEditDialogHeader id={id} />
      <EnterpriseEditForm
        saveEnterprise={saveEnterprise}
        actionsLoading={actionsLoading}
        enterprise={enterpriseForEdit || enterprisesUIProps.initEnterprise}
        onHide={onHide}
      />
    </Modal>
  );
}
