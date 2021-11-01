import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function SubscriptionEditDialogHeader({ id }) {
  // Subscriptions Redux state
  const { subscriptionForEdit, actionsLoading } = useSelector(
    (state) => ({
      subscriptionForEdit: state.subscriptions.subscriptionForEdit,
      actionsLoading: state.subscriptions.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Subscription";
    if (subscriptionForEdit && id) {
      _title = `Edit subscription '${subscriptionForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [subscriptionForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
