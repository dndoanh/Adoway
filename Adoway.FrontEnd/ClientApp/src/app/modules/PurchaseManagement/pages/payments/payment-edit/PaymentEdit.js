/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/payments/paymentsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { PaymentEditForm } from "./PaymentEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

const initPayment = {
  id: undefined,
  code: "",
    paymentId: null
};

export function PaymentEdit({
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
    const { actionsLoading, paymentForEdit } = useSelector(
    (state) => ({
          actionsLoading: state.payments.actionsLoading,
          paymentForEdit: state.payments.paymentForEdit,
    }),
    shallowEqual
  );

    useEffect(() => {
        debugger;
        dispatch(actions.selectPayment(id));
  }, [id, dispatch]);

    useEffect(() => {
    let _title = id ? "" : "New Work Order";
    if (paymentForEdit && id) {
        _title = `Edit product`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentForEdit, id]);

    const savePayment = (values) => {
    if (!id) {
      dispatch(actions.createPayment(values)).then(() => backToPaymentsList());
    } else {
      dispatch(actions.updatePayment(values)).then(() => backToPaymentsList());
    }
  };

  const btnRef = useRef();  
  const savePaymentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToPaymentsList = () => {
    history.push(`/payments`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToPaymentsList}
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
            onClick={savePaymentClick}
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
                  Payment remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  Payment specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <PaymentEditForm
              actionsLoading={actionsLoading}
              payment={paymentForEdit || initPayment}
              btnRef={btnRef}
              savePayment={savePayment}
            />
          )}
          {/*{tab === "remarks" && id && (*/}
          {/*  <RemarksUIProvider currentPaymentId={id}>*/}
          {/*    <Remarks />*/}
          {/*  </RemarksUIProvider>*/}
          {/*)}*/}
          {/*{tab === "specs" && id && (*/}
          {/*  <SpecificationsUIProvider currentPaymentId={id}>*/}
          {/*    <Specifications />*/}
          {/*  </SpecificationsUIProvider>*/}
          {/*)}*/}
        </div>
      </CardBody>
    </Card>
  );
}
