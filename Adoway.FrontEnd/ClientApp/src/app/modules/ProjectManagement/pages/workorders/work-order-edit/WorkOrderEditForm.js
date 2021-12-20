// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, submitForm } from "react";
import { Formik, Form, Field, useFormikContext, setFieldValue } from "formik";
import * as Yup from "yup";
import {
    Input, Select, DatePickerField
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useSelector, useDispatch} from "react-redux";
import {

  WorkOrderStatusTitles,
    WorkOrderTypeTitles,
    WorkOrderCategoryTitles
} from "../WorkOrdersUIHelpers";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";
import * as actions from "../../../../ProjectManagement/_redux/workorders/workOrdersActions";
import { FormattedMessage, useIntl } from 'react-intl';

// Validation schema
const WorkOrderEditSchema = Yup.object().shape({
    code: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function WorkOrderEditForm({
  workorder,
  btnRef,
  saveWorkOrder,
}) {
    const dispatch = useDispatch()
    const { currentProjectsState } = useSelector(
        (state) => ({ currentProjectsState: state.projects }),
        shallowEqual
    );
    const { allProjects } = currentProjectsState;

    const { currentUsersState } = useSelector(
        (state) => ({ currentUsersState: state.users }),
        shallowEqual
    );
    const { allUsers } = currentUsersState;

    const { currentCustomersState } = useSelector(
        (state) => ({ currentCustomersState: state.customers }),
        shallowEqual
    );
    const { allCustomers } = currentCustomersState;

    const { currentApartmentsState } = useSelector(
        (state) => ({ currentApartmentsState: state.apartments }),
        shallowEqual
    );
    const { entities } = currentApartmentsState;
    const [filterApartments, setFilterApartments] = useState([]);
    useEffect(() => {
        //setFilterApartments(workorder.projectId==null ? filterApartments : entities.find(e => e.projectId = workorder.projectId));
        setFilterApartments(entities)
    }, [workorder.projectId]);

    
    const user = useSelector(({ auth }) => auth.user, shallowEqual)
    const FinishWorkOrder = user.functions.find(x => x.code == "FinishWorkOrder")
    const ReturnWorkOrder = user.functions.find(x => x.code == "ReturnWorkOrder")

    const intl = useIntl()
    const code = intl.formatMessage({ id: "WORK_ORDER.CODE" })
    const type = intl.formatMessage({ id: "WORK_ORDER.TYPE" })
    const category = intl.formatMessage({ id: "WORK_ORDER.CATEGORY" })
    const sdate = intl.formatMessage({ id: "TITLE.START_DATE" })
    const edate = intl.formatMessage({ id: "TITLE.END_DATE" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const requester = intl.formatMessage({ id: "COMMON.REQUESTER" })
    const salesman = intl.formatMessage({ id: "COMMON.SALESMAN" })
    const apartment = intl.formatMessage({ id: "COMMON.APARTMENT" })
    const project = intl.formatMessage({ id: "TITLE.PROJECT_NAME" })
    const cus = intl.formatMessage({ id: "COMMON.CUSTOMER" })
    const desc = intl.formatMessage({ id: "TITLE.DESCRIPTION" })
    const supplier = intl.formatMessage({ id: "TITLE.SUPPLIER" })

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={workorder}
        validationSchema={WorkOrderEditSchema}
        onSubmit={(values) => {
          saveWorkOrder(values);
        }}
          >
              {({ handleSubmit}) => (
          <>
            <Form className="form form-label-right">
            <div className="form-group row">
                {workorder.status==1 &&
                    (
                        <>
                            <button
                                type="button"
                                onClick={() => dispatch(actions.updateStatusPassed)}
                                className="btn btn-primary"
                            > Passed
                            </button>
                         </>
                    )
                }
                {workorder.status == 2 &&
                    (
                        <>
                            <button
                                 type="button"
                                 onClick={() => dispatch(actions.updateStatusInprogress)}
                                 className="btn btn-primary"
                            > Inprogress
                            </button>
                         </>
                    )
                }
                {workorder.status == 3 &&
                    (
                        <>
                            <button type="button"
                                 onClick={() => dispatch(actions.updateStatusPending)}
                                 className="btn btn-primary"
                            >Pending
                             </button>
                             {ReturnWorkOrder && (
                                <button type="button"
                                    onClick={() => dispatch(actions.updateStatusReturn)}
                                    className="btn btn-primary"
                                >Return
                                 </button>)
                            }
                            {FinishWorkOrder && (
                                <button type="button"
                                    onClick={() => dispatch(actions.updateStatusFinished)}
                                    className="btn btn-primary"
                                >Finish
                                </button>)
                            }
                        </>
                    )
                }
                {workorder.status == 6 &&
                    (
                        <>
                            {ReturnWorkOrder && (
                                <button type="button"
                                    onClick={() => dispatch(actions.updateStatusReturn)}
                                    className="btn btn-primary"
                                >Return
                                 </button>)
                            }
                            {FinishWorkOrder && (
                                <button type="button"
                                    onClick={() => dispatch(actions.updateStatusFinished)}
                                    className="btn btn-primary"
                                >Finish
                                </button>)
                            }
                        </>
                    )
                }
                {workorder.status == 8 &&
                    (
                        <>
                             <button
                                 type="button"
                                 onClick={() => dispatch(actions.updateStatusPassed)}
                                 className="btn btn-primary"
                            > Passed
                            </button>
                        </>
                    )
                }
            </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="code"
                    component={Input}
                    placeholder={code}
                    label={code}
                  />
                </div>
                <div className="col-lg-4">
                    <Select name="workOrderType" label={type}>
                        {WorkOrderTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}

                    </Select>
                 </div>
                <div className="col-lg-4">
                    <Select name="workOrderCategory" label={category}>
                        {WorkOrderCategoryTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                </div>
             </div>
            <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="projectId" label={project}>
                        <option value=""></option>
                        {allProjects && allProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="supplierId" label={supplier}>
                        <option value=""></option>
                        {allProjects && allProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="apartmentId" label={apartment}>
                        <option value=""></option>
                        {filterApartments && filterApartments.map((apartment) => (
                            <option key={apartment.id} value={apartment.id}>
                                {apartment.name}
                            </option>
                        ))}
                    </Select>
                </div>
                </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="customerId" label={cus}>
                        <option value=""></option>
                        {allCustomers && allCustomers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="startDate"
                        component={Input}
                        placeholder={sdate}
                        label={sdate}
                    />
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="endDate"
                        component={Input}
                        placeholder={edate}
                        label={edate}
                    />
                </div>
              </div>
              <div className="form-group row">
                    <div className="col-lg-4">
                        <Select name="salesmanId" label={salesman}>
                        <option value=""></option>
                            {allUsers && allUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                    <div className="col-lg-4">
                            <Select name="requesterId" label={requester}>
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                <Select name="status" label={status}>
                    {WorkOrderStatusTitles.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
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
