import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ProductEditDialogHeader({ id }) {
  // Products Redux state
  const { productForEdit, actionsLoading } = useSelector(
    (state) => ({
      productForEdit: state.products.productForEdit,
      actionsLoading: state.products.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Product";
    if (productForEdit && id) {
      _title = `Edit product '${productForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [productForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
