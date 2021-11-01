import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import { ProductEditDialogHeader } from "./ProductEditDialogHeader";
import { ProductEditForm } from "./ProductEditForm";
import { useProductsUIContext } from "../ProductsUIContext";

export function ProductEditDialog({ id, show, onHide }) {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      initProduct: productsUIContext.initProduct,
    };
  }, [productsUIContext]);

  // Products Redux state
  const dispatch = useDispatch();
  const { actionsLoading, productForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Product by id
    dispatch(actions.selectProduct(id));
  }, [id, dispatch]);

  // server request for saving product
  const saveProduct = (product) => {
    if (!id) {
      // server request for creating product
      dispatch(actions.createProduct(product)).then(() => onHide());
    } else {
      // server request for updating product
      dispatch(actions.updateProduct(product)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProductEditDialogHeader id={id} />
      <ProductEditForm
        saveProduct={saveProduct}
        actionsLoading={actionsLoading}
        product={productForEdit || productsUIProps.initProduct}
        onHide={onHide}
      />
    </Modal>
  );
}
