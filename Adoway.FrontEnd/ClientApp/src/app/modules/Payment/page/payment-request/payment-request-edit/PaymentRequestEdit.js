/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/payment-request/paymentRequestsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { PaymentRequestEditForm } from "./PaymentRequestEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

const initPaymentRequest = {
  id: undefined,
  code: "",
    paymentRequestId: null
};

export function PaymentRequestEdit({
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
    const { actionsLoading, paymentRequestForEdit } = useSelector(
    (state) => ({
          actionsLoading: state.paymentRequests.actionsLoading,
          paymentRequestForEdit: state.paymentRequests.paymentRequestForEdit,
    }),
    shallowEqual
  );

    useEffect(() => {
        dispatch(actions.selectPaymentRequest(id));
  }, [id, dispatch]);

    useEffect(() => {
    let _title = id ? "" : "New Payment Request";
    if (paymentRequestForEdit && id) {
        _title = `Edit Payment Request`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentRequestForEdit, id]);

    const savePaymentRequest = (values) => {
    if (!id) {
      dispatch(actions.createPaymentRequest(values)).then(() => backToPaymentRequestsList());
    } else {
      dispatch(actions.updatePaymentRequest(values)).then(() => backToPaymentRequestsList());
    }
  };

  const btnRef = useRef();  
  const savePaymentRequestClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToPaymentRequestsList = () => {
    history.push(`/paymentRequests`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToPaymentRequestsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={savePaymentRequestClick}
          >
            Save
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
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("remarks")}>
                <a
                  className={`nav-link ${tab === "remarks" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "remarks").toString()}
                >
                  PaymentRequest remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  PaymentRequest specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <PaymentRequestEditForm
              actionsLoading={actionsLoading}
              paymentRequest={paymentRequestForEdit || initPaymentRequest}
              btnRef={btnRef}
              savePaymentRequest={savePaymentRequest}
            />
          )}
          {/*{tab === "remarks" && id && (*/}
          {/*  <RemarksUIProvider currentPaymentRequestId={id}>*/}
          {/*    <Remarks />*/}
          {/*  </RemarksUIProvider>*/}
          {/*)}*/}
          {/*{tab === "specs" && id && (*/}
          {/*  <SpecificationsUIProvider currentPaymentRequestId={id}>*/}
          {/*    <Specifications />*/}
          {/*  </SpecificationsUIProvider>*/}
          {/*)}*/}
        </div>
      </CardBody>
    </Card>
  );
}
