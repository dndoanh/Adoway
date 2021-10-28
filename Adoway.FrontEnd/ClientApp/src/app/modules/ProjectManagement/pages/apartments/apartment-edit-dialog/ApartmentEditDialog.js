import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/apartments/apartmentsActions";
import { ApartmentEditDialogHeader } from "./ApartmentEditDialogHeader";
import { ApartmentEditForm } from "./ApartmentEditForm";
import { useApartmentsUIContext } from "../ApartmentsUIContext";

export function ApartmentEditDialog({ id, show, onHide }) {
  // Apartments UI Context
  const apartmentsUIContext = useApartmentsUIContext();
  const apartmentsUIProps = useMemo(() => {
    return {
      initApartment: apartmentsUIContext.initApartment,
    };
  }, [apartmentsUIContext]);

  // Apartments Redux state
  const dispatch = useDispatch();
  const { actionsLoading, apartmentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.apartments.actionsLoading,
      apartmentForEdit: state.apartments.apartmentForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Apartment by id
    dispatch(actions.selectApartment(id));
  }, [id, dispatch]);

  // server request for saving apartment
  const saveApartment = (apartment) => {
    if (!id) {
      // server request for creating apartment
      dispatch(actions.createApartment(apartment)).then(() => onHide());
    } else {
      // server request for updating apartment
      dispatch(actions.updateApartment(apartment)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ApartmentEditDialogHeader id={id} />
      <ApartmentEditForm
        saveApartment={saveApartment}
        actionsLoading={actionsLoading}
        apartment={apartmentForEdit || apartmentsUIProps.initApartment}
        onHide={onHide}
      />
    </Modal>
  );
}
