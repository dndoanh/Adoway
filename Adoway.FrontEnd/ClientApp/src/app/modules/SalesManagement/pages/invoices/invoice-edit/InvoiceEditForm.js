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

  InvoiceStatusTitles,
    InvoiceTypeTitles,
    InvoiceAreaTitles
} from "../InvoicesUIHelpers";
import { FormattedMessage, useIntl } from 'react-intl';

// Validation schema
const InvoiceEditSchema = Yup.object().shape({
    invoiceNo: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function InvoiceEditForm({
  invoice,
  btnRef,
  saveInvoice,
}) {

    const { currentCustomersState } = useSelector(
        (state) => ({ currentCustomersState: state.customers }),
        shallowEqual
    );
    const { allCustomers } = currentCustomersState;

    const { currentSuppliersState } = useSelector(
        (state) => ({ currentSuppliersState: state.suppliers }),
        shallowEqual
    );
    const { entities } = currentSuppliersState;

    const { currentProjectsState } = useSelector(
        (state) => ({ currentProjectsState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectsState;
    const [attachedFile, setFile] = useState("");
    useEffect(() => {
        if (invoice.attachments) {
            setFile(invoice.attachment);
        }
    }, [invoice]);

    const intl = useIntl()
    const invoiceNo = intl.formatMessage({ id: "SALES.INVOICES.INVOICENO" })
    const invoicedDate = intl.formatMessage({ id: "SALES.INVOICES.INVOICE_DATE" })
    const dueDate = intl.formatMessage({ id: "SALES.INVOICES.DUE_DATE" })
    const cusName = intl.formatMessage({ id: "TITLE.CUSTOMER_NAME" })
    const supplierName = intl.formatMessage({ id: "TITLE.SUPPLIER_NAME" })
    const projectName = intl.formatMessage({ id: "TITLE.PROJECT_NAME" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const amount = intl.formatMessage({ id: "SALES.INVOICES.AMOUNT" })
    const attachment = intl.formatMessage({ id: "SALES.INVOICES.ATTACHMENTS" })
    const desc = intl.formatMessage({ id: "TITLE.DESCRIPTION" })
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={invoice}
        validationSchema={InvoiceEditSchema}
        onSubmit={(values) => {
          saveInvoice(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="invoiceNo"
                    component={Input}
                    placeholder={invoiceNo}
                    label={invoiceNo}
                  />
                </div>
                 <div className="col-lg-4">
                    <DatePickerField
                        name="invoicedDate"
                        component={Input}
                        placeholder={invoicedDate}
                        label={invoicedDate}
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
                        placeholder={attachment}
                        label={attachment}
                        value={attachedFile || invoice.attachments}
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
                    <Select name="paymentStatus" label={status}>
                        <option value="1">Unpaid</option>
                        <option value="2">Paid</option>
                    </Select>
                </div>
            </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="customerId" label={cusName}>
                        <option value=""></option>
                            {allCustomers  && allCustomers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                    <div className="col-lg-4">
                        <Select name="supplierId" label={supplierName}>
                        <option value=""></option>
                        {entities &&  entities.map((s) => (
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
