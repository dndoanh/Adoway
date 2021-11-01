import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/subscriptions/subscriptionsActions";
import { SubscriptionEditDialogHeader } from "./SubscriptionEditDialogHeader";
import { SubscriptionEditForm } from "./SubscriptionEditForm";
import { useSubscriptionsUIContext } from "../SubscriptionsUIContext";

export function SubscriptionEditDialog({ id, show, onHide }) {
  // Subscriptions UI Context
  const subscriptionsUIContext = useSubscriptionsUIContext();
  const subscriptionsUIProps = useMemo(() => {
    return {
      initSubscription: subscriptionsUIContext.initSubscription,
    };
  }, [subscriptionsUIContext]);

  // Subscriptions Redux state
  const dispatch = useDispatch();
  const { actionsLoading, subscriptionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.subscriptions.actionsLoading,
      subscriptionForEdit: state.subscriptions.subscriptionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Subscription by id
    dispatch(actions.selectSubscription(id));
  }, [id, dispatch]);

  // server request for saving subscription
  const saveSubscription = (subscription) => {
    if (!id) {
      // server request for creating subscription
      dispatch(actions.createSubscription(subscription)).then(() => onHide());
    } else {
      // server request for updating subscription
      dispatch(actions.updateSubscription(subscription)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <SubscriptionEditDialogHeader id={id} />
      <SubscriptionEditForm
        saveSubscription={saveSubscription}
        actionsLoading={actionsLoading}
        subscription={subscriptionForEdit || subscriptionsUIProps.initSubscription}
        onHide={onHide}
      />
    </Modal>
  );
}
