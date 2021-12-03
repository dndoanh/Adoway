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
                    placeholder="Code"
                    label="Code"
                  />
                </div>
                <div className="col-lg-4">
                    <Select name="workOrderType" label="WorkOrderType">
                        {WorkOrderTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}

                    </Select>
                 </div>
                <div className="col-lg-4">
                    <Select name="workOrderCategory" label="WorkOrderCategory">
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
                    <Select name="projectId" label="Project">
                        <option value=""></option>
                        {allProjects && allProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="supplierId" label="Supplier">
                        <option value=""></option>
                        {allProjects && allProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="apartmentId" label="Apartment">
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
                    <Select name="customerId" label="Customer">
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
                        placeholder="Start Date"
                        label="Start Date"
                    />
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="endDate"
                        component={Input}
                        placeholder="End Date"
                        label="End Date"
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                        <Select name="salesmanId" label="Salesman">
                        <option value=""></option>
                            {allUsers && allUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                 <Select name="requesterId" label="Requester">
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                  <Select name="status" label="Status">
                    {WorkOrderStatusTitles.map((status, index) => (
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
