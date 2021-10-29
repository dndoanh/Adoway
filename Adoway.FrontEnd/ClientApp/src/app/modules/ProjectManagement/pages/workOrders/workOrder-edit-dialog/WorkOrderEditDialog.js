import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/workorders/workOrdersActions";
import { WorkOrderEditDialogHeader } from "./WorkOrderEditDialogHeader";
import { WorkOrderEditForm } from "./WorkOrderEditForm";
import { useWorkOrdersUIContext } from "../WorkOrdersUIContext";

export function WorkOrderEditDialog({ id, show, onHide }) {
  // WorkOrders UI Context
  const workOrdersUIContext = useWorkOrdersUIContext();
  const workOrdersUIProps = useMemo(() => {
    return {
      initWorkOrder: workOrdersUIContext.initWorkOrder,
    };
  }, [workOrdersUIContext]);

  // WorkOrders Redux state
  const dispatch = useDispatch();
  const { actionsLoading, workOrderForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.workOrders.actionsLoading,
      workOrderForEdit: state.workOrders.workOrderForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting WorkOrder by id
    dispatch(actions.selectWorkOrder(id));
  }, [id, dispatch]);

  // server request for saving workOrder
  const saveWorkOrder = (workOrder) => {
    if (!id) {
      // server request for creating workOrder
      dispatch(actions.createWorkOrder(workOrder)).then(() => onHide());
    } else {
      // server request for updating workOrder
      dispatch(actions.updateWorkOrder(workOrder)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <WorkOrderEditDialogHeader id={id} />
      <WorkOrderEditForm
        saveWorkOrder={saveWorkOrder}
        actionsLoading={actionsLoading}
        workOrder={workOrderForEdit || workOrdersUIProps.initWorkOrder}
        onHide={onHide}
      />
    </Modal>
  );
}
