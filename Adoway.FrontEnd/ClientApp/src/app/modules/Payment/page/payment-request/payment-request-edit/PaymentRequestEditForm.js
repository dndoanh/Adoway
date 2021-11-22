// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState}  from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input, Select, DatePickerField, HorizontalNonLinearStepper
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useSelector, useDispatch} from "react-redux";
import {

  PaymentRequestStatusTitles,
    PaymentRequestTypeTitles,
    PaymentRequestAreaTitles
} from "../PaymentRequestsUIHelpers";

// Validation schema
const PaymentRequestEditSchema = Yup.object().shape({
    requestNo: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function PaymentRequestEditForm({
  paymentRequest,
  btnRef,
  savePaymentRequest,
}) {
    const { currentCustomersState } = useSelector(
        (state) => ({ currentCustomersState: state.customers }),
        shallowEqual
    );
    const { allCustomers } = currentCustomersState;

    const { currentUsersState } = useSelector(
        (state) => ({ currentUsersState: state.users }),
        shallowEqual
    );
    const { allUsers } = currentUsersState;

    const { currentProjectsState } = useSelector(
        (state) => ({ currentProjectsState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectsState;

    const [attachedFile, setFile] = useState("");
    useEffect(() => {
        if (paymentRequest.attachments) {
            setFile(paymentRequest.attachment);
        }
    }, [paymentRequest]);
  
  return (
    <>
          <Formik
              enableReinitialize={true}
              initialValues={paymentRequest}
              validationSchema={PaymentRequestEditSchema}
              onSubmit={(values) => {
                  savePaymentRequest(values);
              }}
          >
              {({ handleSubmit, setFieldValue }) => (
                  <>
                      <Form className="form form-label-right">
                          <div className="form-group row">
                              <HorizontalNonLinearStepper name="status" value={paymentRequest.status || 0 } />
                           </div>
                        
                          <div className="form-group row">
                              <div className="col-lg-4">
                                  <Field
                                      name="requestNo"
                                      component={Input}
                                      placeholder="RequestNo"
                                      label="RequestNo"
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <DatePickerField
                                      name="dueDate"
                                      component={Input}
                                      placeholder="Due Date"
                                      label="Due Date"
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <Field
                                      name="depositAmount"
                                      component={Input}
                                      placeholder="Deposit Amount"
                                      label="Deposit Amount"
                                      type="number"
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <div className="col-lg-4">
                                  <Field
                                      name="amount"
                                      component={Input}
                                      placeholder="Amount"
                                      label="Amount"
                                      type="number"
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <Field
                                      name="attachments"
                                      component={Input}
                                      placeholder="attachments"
                                      label="Attachments"
                                      value={attachedFile || paymentRequest.attachments}
                                  />
                                  <input
                                      type="file"
                                      name="attachment"
                                      onChange={(e) => {
                                          const fileReader = new FileReader();
                                          fileReader.onload = () => {
                                              if (fileReader.readyState === 2) {
                                                  setFieldValue('attachments', fileReader.result);
                                                  setFile(fileReader.result);
                                              }
                                          };
                                          fileReader.readAsDataURL(e.target.files[0]);
                                      }}
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <Select name="paymentMethod" label="Payment Method">
                                      <option value="1">Cash</option>
                                      <option value="2">Bank</option>
                                  </Select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <div className="col-lg-4">
                                  <Select name="requesterId" label="Requester">
                                      <option value=""></option>
                                      {allUsers && allUsers.map((s) => (
                                          <option key={s.id} value={s.id}>
                                              {s.name}
                                          </option>
                                      ))}
                                  </Select>
                              </div>
                              <div className="col-lg-4">
                                  <Select name="customerId" label="Customer">
                                      <option value=""></option>
                                      {allCustomers && allCustomers.map((s) => (
                                          <option key={s.id} value={s.id}>
                                              {s.name}
                                          </option>
                                      ))}
                                  </Select>
                              </div>
                              <div className="col-lg-4">
                                  <Select name="projectId" label="Project">
                                      <option value=""></option>
                                      {allProjects && allProjects.map((user) => (
                                          <option key={user.id} value={user.id}>
                                              {user.name}
                                          </option>
                                      ))}
                                  </Select>
                              </div>
                          </div>
                          <div className="form-group">
                              <label>Note</label>
                              <Field
                                  name="note"
                                  as="textarea"
                                  className="form-control"
                                  rows="4"
                              />
                          </div>
                          <div className="form-group">
                              <label>Description</label>
                              <Field
                                  name="description"
                                  as="textarea"
                                  className="form-control"
                                  rows="4"
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
