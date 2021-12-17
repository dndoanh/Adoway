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
import { FormattedMessage, useIntl } from 'react-intl';

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

    const intl = useIntl()
    const requestNo = intl.formatMessage({ id: "PAYMENT.REQUESTNO" })
    const dueDate = intl.formatMessage({ id: "SALES.INVOICES.DUE_DATE" })
    const amount = intl.formatMessage({ id: "SALES.INVOICES.AMOUNT" })
    const projectName = intl.formatMessage({ id: "TITLE.PROJECT_NAME" })
    const attachments = intl.formatMessage({ id: "SALES.INVOICES.ATTACHMENTS" })
    const method = intl.formatMessage({ id: "TITLE.ACTION" })
    const requester = intl.formatMessage({ id: "PAYMENT.REQUESTER" })
    const customer = intl.formatMessage({ id: "PAYMENT.CUSTOMER" })
    const note = intl.formatMessage({ id: "PAYMENT.NOTE" })
    const desc = intl.formatMessage({ id: "TITLE.DESCRIPTION" })
    
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
                                      placeholder={requestNo}
                                      label={requestNo}
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <DatePickerField
                                      name="dueDate"
                                      component={Input}
                                      placeholder={dueDate}
                                      label={dueDate}
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
                                      placeholder={amount}
                                      label={amount}
                                      type="number"
                                  />
                              </div>
                              <div className="col-lg-4">
                                  <Field
                                      name="attachments"
                                      component={Input}
                                      placeholder={attachments}
                                      label={attachments}
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
                                  <Select name="paymentMethod" label={method}>
                                      <option value="1">Cash</option>
                                      <option value="2">Bank</option>
                                  </Select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <div className="col-lg-4">
                                  <Select name="requesterId" label={requester}>
                                      <option value=""></option>
                                      {allUsers && allUsers.map((s) => (
                                          <option key={s.id} value={s.id}>
                                              {s.name}
                                          </option>
                                      ))}
                                  </Select>
                              </div>
                              <div className="col-lg-4">
                                  <Select name="customerId" label={customer}>
                                      <option value=""></option>
                                      {allCustomers && allCustomers.map((s) => (
                                          <option key={s.id} value={s.id}>
                                              {s.name}
                                          </option>
                                      ))}
                                  </Select>
                              </div>
                              <div className="col-lg-4">
                                  <Select name="projectId" label={projectName}>
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
                              <label>{note}</label>
                              <Field
                                  name="note"
                                  as="textarea"
                                  className="form-control"
                                  rows="4"
                              />
                          </div>
                          <div className="form-group">
                              <label>{desc}</label>
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
