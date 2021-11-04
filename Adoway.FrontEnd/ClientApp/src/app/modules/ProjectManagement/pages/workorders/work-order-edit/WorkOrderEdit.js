/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/workorders/workOrdersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { WorkOrderEditForm } from "./WorkOrderEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

const initWorkOrder = {
  id: undefined,
  code: "",
    projectId: null
};

export function WorkOrderEdit({
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
    const { actionsLoading, workOrderForEdit } = useSelector(
    (state) => ({
          actionsLoading: state.workorders.actionsLoading,
          workOrderForEdit: state.workorders.workOrderForEdit,
    }),
    shallowEqual
  );

    useEffect(() => {
        dispatch(actions.selectWorkOrder(id));
  }, [id, dispatch]);

    useEffect(() => {
    let _title = id ? "" : "New Work Order";
    if (workOrderForEdit && id) {
        _title = `Edit product`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workOrderForEdit, id]);

    const saveWorkOrder = (values) => {
    if (!id) {
      dispatch(actions.createWorkOrder(values)).then(() => backToWorkOrdersList());
    } else {
      dispatch(actions.updateWorkOrder(values)).then(() => backToWorkOrdersList());
    }
  };

  const btnRef = useRef();  
  const saveWorkOrderClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToWorkOrdersList = () => {
    history.push(`/workorders`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToWorkOrdersList}
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
            onClick={saveWorkOrderClick}
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
                  WorkOrder remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  WorkOrder specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <WorkOrderEditForm
              actionsLoading={actionsLoading}
              workorder={workOrderForEdit || initWorkOrder}
              btnRef={btnRef}
              saveWorkOrder={saveWorkOrder}
            />
          )}
          {/*{tab === "remarks" && id && (*/}
          {/*  <RemarksUIProvider currentWorkOrderId={id}>*/}
          {/*    <Remarks />*/}
          {/*  </RemarksUIProvider>*/}
          {/*)}*/}
          {/*{tab === "specs" && id && (*/}
          {/*  <SpecificationsUIProvider currentWorkOrderId={id}>*/}
          {/*    <Specifications />*/}
          {/*  </SpecificationsUIProvider>*/}
          {/*)}*/}
        </div>
      </CardBody>
    </Card>
  );
}
