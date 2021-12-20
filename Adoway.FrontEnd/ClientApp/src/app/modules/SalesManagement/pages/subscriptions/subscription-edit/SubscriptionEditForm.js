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
import { shallowEqual, useSelector, useDispatch} from "react-redux";
import {

  SubscriptionStatusTitles,
    SubscriptionTypeTitles,
    SubscriptionAreaTitles
} from "../SubscriptionsUIHelpers";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";
import { FormattedMessage, useIntl } from 'react-intl';
// Validation schema
const SubscriptionEditSchema = Yup.object().shape({
    contractCode: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function SubscriptionEditForm({
  subscription,
  btnRef,
  saveSubscription,
}) {

    const { currentApartmentsState } = useSelector(
        (state) => ({ currentApartmentsState: state.apartments }),
        shallowEqual
    );
    const { entities } = currentApartmentsState;

    const { currentProductsState } = useSelector(
        (state) => ({ currentProductsState: state.products }),
        shallowEqual
    );
    const { allProducts } = currentProductsState;


    const { currentCustomersState } = useSelector(
        (state) => ({ currentCustomersState: state.customers }),
        shallowEqual
    );
    const { allCustomers } = currentCustomersState;

    const intl = useIntl()
    const contractCode = intl.formatMessage({ id: "SALES.SUBS.CONTRACT_CODE" })
    const customerCode = intl.formatMessage({ id: "SALES.SUBS.CUSTOMER_CODE" })
    const startDate = intl.formatMessage({ id: "TITLE.START_DATE" })
    const endDate = intl.formatMessage({ id: "TITLE.END_DATE" })
    const salesPrice = intl.formatMessage({ id: "SALES.SUBS.SALES_PRICE" })
    const product = intl.formatMessage({ id: "COMMON.PRODUCT" })
    const apartment = intl.formatMessage({ id: "COMMON.APARTMENT" })
    const desc = intl.formatMessage({ id: "TITLE.DESCRIPTION" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const cus = intl.formatMessage({ id: "PAYMENT.CUSTOMER" })
    
 
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={subscription}
        validationSchema={SubscriptionEditSchema}
        onSubmit={(values) => {
          saveSubscription(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="contractCode"
                    component={Input}
                    placeholder={contractCode}
                    label={contractCode}
                  />
                </div>
                <div className="col-lg-4">
                <Field
                    name="customerCode"
                    component={Input}
                    placeholder={customerCode}
                    label={customerCode}
                />
                </div>
                <div className="col-lg-4">
                 <Select name="subscriptionPeriod" label="Subscription Period">
                        {SubscriptionTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                 </div>
              
             </div>
            <div className="form-group row">
                <div className="col-lg-4">
                    <DatePickerField
                        name="startDate"
                        component={Input}
                        placeholder={startDate}
                        label={startDate}
                    />
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="endDate"
                        component={Input}
                        placeholder={endDate}
                        label={endDate}
                    />
                </div>
                <div className="col-lg-4">
                    <Select name="status" label={status}>
                        {SubscriptionStatusTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                 </div>
            </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                        name="salesPrice"
                        component={Input}
                        placeholder={salesPrice}
                        label={salesPrice}
                    />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="freeMonth"
                        component={Input}
                        placeholder="Free Month"
                        label="Free Month"
                    />
                </div>
                 <div className="col-lg-4">
                    <Select name="customerId" label={cus}>
                        <option value=""></option>
                        {allCustomers && allCustomers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="productId" label={product}>
                         <option value=""></option>
                        {allProducts && allProducts.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>

                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="apartmentId" label={apartment}>
                         <option value=""></option>
                        {entities && entities.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>

                        ))}
                    </Select>
                </div>
               
              </div>
           
              <div className="form-group">
                <label>{desc}</label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
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
