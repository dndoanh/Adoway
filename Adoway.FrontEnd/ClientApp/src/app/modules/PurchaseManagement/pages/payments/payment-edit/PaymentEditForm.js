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

  PaymentStatusTitles,
    PaymentTypeTitles,
    PaymentAreaTitles
} from "../PaymentsUIHelpers";
import * as apartmentsActions from "../../../../PaymentManagement/_redux/apartments/apartmentsActions";

// Validation schema
const PaymentEditSchema = Yup.object().shape({
    code: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function PaymentEditForm({
  payment,
  btnRef,
  savePayment,
}) {
    const dispatch = useDispatch();
    const { currentPaymentsState } = useSelector(
        (state) => ({ currentPaymentsState: state.payments }),
        shallowEqual
    );
    const { allPayments } = currentPaymentsState;

    const { currentUsersState } = useSelector(
        (state) => ({ currentUsersState: state.users }),
        shallowEqual
    );
    const { allUsers } = currentUsersState;

    const { currentOwnersState } = useSelector(
        (state) => ({ currentOwnersState: state.owners }),
        shallowEqual
    );
    const { allOwners } = currentOwnersState;

    const { currentApartmentsState } = useSelector(
        (state) => ({ currentApartmentsState: state.apartments }),
        shallowEqual
    );
    const { entities } = currentApartmentsState;
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          savePayment(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="code"
                    component={Input}
                    placeholder="Code"
                    label="Code"
                  />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="name"
                        component={Input}
                        placeholder="Name"
                        label="Name"
                    />
                </div>
                <div className="col-lg-4">
                    <Select name="paymentType" label="PaymentType">
                        {PaymentTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                        {/*<option key="1" value="1">Investment</option>*/}
                        {/*<option key="2" value="2">No Investment</option>*/}
                    </Select>
                 </div>
              
             </div>
            <div className="form-group row">
                <div className="col-lg-4">
                    <DatePickerField
                        name="activeDate"
                        component={Input}
                        placeholder="Active Date"
                        label="Active Date"
                    />
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="beginDate"
                        component={Input}
                        placeholder="Begin Date"
                        label="Begin Date"
                    />
                </div>
                <div className="col-lg-4">
                    <Select name="status" label="Status">
                        {PaymentStatusTitles.map((status, index) => (
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
                        name="blockCount"
                        component={Input}
                        placeholder="BlockCount"
                        label="BlockCount"
                    />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="floorCount"
                        component={Input}
                        placeholder="Floor Count"
                        label="Floor Count"
                    />
                </div>
                 <div className="col-lg-4">
                    <Field
                        name="basementCount"
                        component={Input}
                        placeholder="Basement Count"
                        label="Basement Count"
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                        name="squareCount"
                        component={Input}
                        placeholder="Square Count"
                        label="Square Count"
                    />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="portCount"
                        component={Input}
                        placeholder="Port Count"
                        label="Port Count"
                    />
                </div>
                 <div className="col-lg-4">
                    <Field
                        name="apartmentCount"
                        component={Input}
                        placeholder="Apartmnent Count"
                        label="Apartmnent Count"
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                        <Select name="ownerId" label="Owner">
                        <option value=""></option>
                            {allOwners  && allOwners.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                 <Select name="salesUserId" label="Sale user">
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="techUserId" label="Tech User">
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                          </div>
                <div className="form-group row">
                    <div className="col-lg-4">
                      <Select name="areaType" label="Area">
                        {PaymentAreaTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                                    
                    </Select>
                    </div>
                  
                </div>
              <div className="form-group">
                <label>Description</label>
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
