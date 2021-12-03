import React, { useEffect} from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
    EventTableWidget,
    PaymentRequestTableWidget,
    WorkOrderTableWidget,
} from "../widgets";
import * as eventsActions from "../../../../src/app/modules/Calendar/_redux/events/eventsActions";
import * as paymentRequestsActions from "../../../../src/app/modules/Payment/_redux/payment-request/paymentRequestsActions";
import * as workOrdersActions from "../../../../src/app/modules/ProjectManagement/_redux/workorders/workOrdersActions";

export function DemoDashboard() {
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(eventsActions.fetchEvents({ filter: { title: "" }, pageSize: 100, pageNumber: 1, sortOrder: "asc", sortField: "title" }))
   
        dispatch(workOrdersActions.fetchWorkOrders({ filter: { code: "" }, pageSize: 100, pageNumber: 1, sortOrder: "asc", sortField: "code" }));
         dispatch(paymentRequestsActions.fetchAllPaymentRequests)
    }, []);
    const { currentEventState } = useSelector(
        (state) => ({ currentEventState: state.events }),
        shallowEqual
    );
    const { currentPaymentRequestState } = useSelector(
        (state) => ({ currentPaymentRequestState: state.paymentRequests}),
        shallowEqual
    );
    const { currentWorkOrderState } = useSelector(
        (state) => ({ currentWorkOrderState: state.workorders }),
        shallowEqual
    );
  return (
    <>
          <div className="row">
              <div className="col-xl-12">
                  <EventTableWidget
                      className="gutter-b"
                      events={currentEventState.entities.filter(e => e.startDate > Date.now())}
                  />
              </div>
          </div>
          <div className="row">
              <div className="col-xl-12">
                  <PaymentRequestTableWidget
                      className="gutter-b"
                      events={currentPaymentRequestState.entities}
                  />
              </div>
          </div>
          <div className="row">
              <div className="col-xl-12">
                  <WorkOrderTableWidget
                      className="gutter-b"
                      events={currentWorkOrderState.entities}
                  />
              </div>
          </div>
    </>
  );
}
