// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState}  from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input, Select, DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';
import {

  ProductStatusTitles,
    ProductTypeTitles,
    ProductAreaTitles
} from "../ProductsUIHelpers";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";

// Validation schema
const ProductEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function ProductEditForm({
  product,
  btnRef,
  saveProduct,
}) {

    const { currentCategoriesState } = useSelector(
        (state) => ({ currentCategoriesState: state.categories }),
        shallowEqual
    );
    const { allCategories } = currentCategoriesState;

    const { currentUsersState } = useSelector(
        (state) => ({ currentUsersState: state.users }),
        shallowEqual
    );
    const { allUsers } = currentUsersState;
    const intl = useIntl()
    const meatureUnitTitle = intl.formatMessage({ id: "TITLE.MEASURE_UNIT" })
    const nameTitle = intl.formatMessage({ id: "TITLE.NAME" })
    const statusTitle = intl.formatMessage({ id: "TITLE.STATUS" })
    const salespriceTitle = intl.formatMessage({ id: "TITLE.SALES_PRICE" })
    const categoryTitle = intl.formatMessage({ id: "TITLE.CATEGORY" })
    const supplierTitle = intl.formatMessage({ id: "TITLE.SUPPLIER" })
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
             
                <div className="col-lg-6">
                    <Field
                        name="name"
                        component={Input}
                        placeholder={nameTitle}
                        label={nameTitle}
                    />
                </div>
                <div className="col-lg-6">
                    <Field
                        name="salesPrice"
                        component={Input}
                        placeholder={salespriceTitle}
                        label={salespriceTitle}
                    />
                </div>
             </div>
            <div className="form-group row">
                 <div className="col-lg-6">
                    <Select name="measureUnit" label={meatureUnitTitle}>
                        {ProductTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                 </div>
                <div className="col-lg-6">
                    <Select name="status" label={statusTitle}>
                            <option value=""></option>
                        {ProductStatusTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                  </div>
             </div>
            <div className="form-group row">
                <div className="col-lg-6">
                <Select name="categoryId" label={categoryTitle}>
                        <option value=""></option>
                        {allCategories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                </Select>
                 </div>
                <div className="col-lg-6">
                    <Select name="supplierId" label={supplierTitle}>
                        <option value=""></option>
                        {allUsers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                </Select>
                </div>
            </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
