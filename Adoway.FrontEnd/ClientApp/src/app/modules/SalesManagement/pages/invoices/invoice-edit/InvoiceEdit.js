/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/invoices/invoicesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { InvoiceEditForm } from "./InvoiceEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import moment from 'moment'
import { FormattedMessage, useIntl } from 'react-intl';

const initInvoice = {
  id: undefined,
  code: "",
    invoiceId: null
};

export function InvoiceEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
    const { actionsLoading, invoiceForEdit } = useSelector(
    (state) => ({
          actionsLoading: state.invoices.actionsLoading,
            //invoiceForEdit: state.invoices.invoiceForEdit
            invoiceForEdit: {
                ...state.invoices.invoiceForEdit,
                invoicedDate: (state.invoices.invoiceForEdit && state.invoices.invoiceForEdit.invoicedDate) ? moment(state.invoices.invoiceForEdit?.invoicedDate).format("DD/MM/YYYY HH:mm:ss") : "",
                dueDate: state.invoices.invoiceForEdit ? moment(state.invoices.invoiceForEdit.dueDate).format("DD/MM/YYYY HH:mm:ss") : "",
            }
    }),
    shallowEqual
  );

    useEffect(() => {
        dispatch(actions.selectInvoice(id));
  }, [id, dispatch]);

    const intl = useIntl()
    const new_inv = intl.formatMessage({ id: "SALES.INVOICES.NEW_INVOICE" })
    const edit_inv = intl.formatMessage({ id: "SALES.INVOICES.EDIT_INVOICE" })
    useEffect(() => {
        let _title = id ? "" : new_inv;
    if (invoiceForEdit && id) {
        _title = edit_inv;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceForEdit, id]);

    const saveInvoice = (values) => {
    if (!id) {
      dispatch(actions.createInvoice(values)).then(() => backToInvoicesList());
    } else {
      dispatch(actions.updateInvoice(values)).then(() => backToInvoicesList());
    }
  };

  const btnRef = useRef();  
  const saveInvoiceClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToInvoicesList = () => {
    history.push(`/invoices`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToInvoicesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            <FormattedMessage id="COMMON.BACK"/>
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
                <FormattedMessage id="COMMON.RESET" />
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveInvoiceClick}
          >
            <FormattedMessage id="COMMON.SAVE" />
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic info
            </a>
          </li>
          {/*{id && (*/}
          {/*  <>*/}
          {/*    {" "}*/}
          {/*    <li className="nav-item" onClick={() => setTab("remarks")}>*/}
          {/*      <a*/}
          {/*        className={`nav-link ${tab === "remarks" && "active"}`}*/}
          {/*        data-toggle="tab"*/}
          {/*        role="button"*/}
          {/*        aria-selected={(tab === "remarks").toString()}*/}
          {/*      >*/}
          {/*        Invoice remarks*/}
          {/*      </a>*/}
          {/*    </li>*/}
          {/*    <li className="nav-item" onClick={() => setTab("specs")}>*/}
          {/*      <a*/}
          {/*        className={`nav-link ${tab === "specs" && "active"}`}*/}
          {/*        data-toggle="tab"*/}
          {/*        role="tab"*/}
          {/*        aria-selected={(tab === "specs").toString()}*/}
          {/*      >*/}
          {/*        Invoice specifications*/}
          {/*      </a>*/}
          {/*    </li>*/}
          {/*  </>*/}
          {/*)}*/}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <InvoiceEditForm
              actionsLoading={actionsLoading}
              invoice={invoiceForEdit || initInvoice}
              btnRef={btnRef}
              saveInvoice={saveInvoice}
            />
          )}
          {/*{tab === "remarks" && id && (*/}
          {/*  <RemarksUIProvider currentInvoiceId={id}>*/}
          {/*    <Remarks />*/}
          {/*  </RemarksUIProvider>*/}
          {/*)}*/}
          {/*{tab === "specs" && id && (*/}
          {/*  <SpecificationsUIProvider currentInvoiceId={id}>*/}
          {/*    <Specifications />*/}
          {/*  </SpecificationsUIProvider>*/}
          {/*)}*/}
        </div>
      </CardBody>
    </Card>
  );
}
