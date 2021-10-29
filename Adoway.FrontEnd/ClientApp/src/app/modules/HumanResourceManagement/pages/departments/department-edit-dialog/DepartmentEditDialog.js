import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/departments/departmentsActions";
import { DepartmentEditDialogHeader } from "./DepartmentEditDialogHeader";
import { DepartmentEditForm } from "./DepartmentEditForm";
import { useDepartmentsUIContext } from "../DepartmentsUIContext";

export function DepartmentEditDialog({ id, show, onHide }) {
  // Departments UI Context
  const departmentsUIContext = useDepartmentsUIContext();
  const departmentsUIProps = useMemo(() => {
    return {
      initDepartment: departmentsUIContext.initDepartment,
    };
  }, [departmentsUIContext]);

  // Departments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, departmentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.departments.actionsLoading,
      departmentForEdit: state.departments.departmentForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Department by id
    dispatch(actions.selectDepartment(id));
  }, [id, dispatch]);

  // server request for saving department
  const saveDepartment = (department) => {
    if (!id) {
      // server request for creating department
      dispatch(actions.createDepartment(department)).then(() => onHide());
    } else {
      // server request for updating department
      dispatch(actions.updateDepartment(department)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DepartmentEditDialogHeader id={id} />
      <DepartmentEditForm
        saveDepartment={saveDepartment}
        actionsLoading={actionsLoading}
        department={departmentForEdit || departmentsUIProps.initDepartment}
        onHide={onHide}
      />
    </Modal>
  );
}
