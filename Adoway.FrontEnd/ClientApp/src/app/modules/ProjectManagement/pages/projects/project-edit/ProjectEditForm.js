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

  ProjectStatusTitles,
    ProjectTypeTitles,
    ProjectAreaTitles
} from "../ProjectsUIHelpers";
import * as apartmentsActions from "../../../../ProjectManagement/_redux/apartments/apartmentsActions";
import { FormattedMessage, useIntl } from 'react-intl';
// Validation schema
const ProjectEditSchema = Yup.object().shape({
    code: Yup.string()
        .min(2, "Minimum 2 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Model is required"),
});

export function ProjectEditForm({
  project,
  btnRef,
  saveProject,
}) {
    const dispatch = useDispatch();
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

    const { currentOwnersState } = useSelector(
        (state) => ({ currentOwnersState: state.owners }),
        shallowEqual
    );
    const { allOwners } = currentOwnersState;

    const { currentApartmentsState } = useSelector(
        (state) => ({ currentApartmentsState: state.apartments }),
        shallowEqual
    );
    const { entities } = currentApartmentsState;
    const intl = useIntl()
    const code = intl.formatMessage({ id: "PROJECT.CODE" })
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const activeDate = intl.formatMessage({ id: "PROJECT.ACTIVE_DATE" })
    const beginDate = intl.formatMessage({ id: "PROJECT.BEGIN_DATE" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const p_type = intl.formatMessage({ id: "PROJECT.AREA_TYPE" })
    const a_type = intl.formatMessage({ id: "PROJECT.PROJECT_TYPE" })
    const owner = intl.formatMessage({ id: "COMMON.OWNER" })
    const block = intl.formatMessage({ id: "PROJECT.BLOCK_COUNT" })
    const floor = intl.formatMessage({ id: "PROJECT.FLOOR_COUNT" })
    const base = intl.formatMessage({ id: "PROJECT.BASEMENT_COUNT" })
    const square = intl.formatMessage({ id: "PROJECT.SQUARE_COUNT" })
    const port = intl.formatMessage({ id: "PROJECT.PORT_COUNT" })
    const apartment = intl.formatMessage({ id: "PROJECT.APARTMENT_COUNT" })
    const desc = intl.formatMessage({ id: "TITLE.DESCRIPTION" })
    const sale = intl.formatMessage({ id: "PROJECT.SALE_USER" })
    const tech = intl.formatMessage({ id: "PROJECT.TECH_USER" })
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={project}
        validationSchema={ProjectEditSchema}
        onSubmit={(values) => {
          saveProject(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
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
                    <Field
                        name="name"
                        component={Input}
                        placeholder={name}
                        label={name}
                    />
                </div>
                <div className="col-lg-4">
                    <Select name="projectType" label={p_type}>
                        {ProjectTypeTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                 </div>
              
             </div>
            <div className="form-group row">
                <div className="col-lg-4">
                    <DatePickerField
                        name="activeDate"
                        component={Input}
                        placeholder={activeDate}
                        label={activeDate}
                    />
                </div>
                <div className="col-lg-4">
                    <DatePickerField
                        name="beginDate"
                        component={Input}
                        placeholder={beginDate}
                        label={beginDate}
                    />
                </div>
                <div className="col-lg-4">
                    <Select name="status" label={status}>
                        {ProjectStatusTitles.map((status, index) => (
                            <option key={status} value={index}>
                                {status}
                            </option>
                        ))}
                    </Select>
                 </div>
            </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                        name="blockCount"
                        component={Input}
                        placeholder={block}
                        label={block}
                    />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="floorCount"
                        component={Input}
                        placeholder={floor}
                        label={floor}
                    />
                </div>
                 <div className="col-lg-4">
                    <Field
                        name="basementCount"
                        component={Input}
                        placeholder={base}
                        label={base}
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                        name="squareCount"
                        component={Input}
                        placeholder={square}
                        label={square}
                    />
                </div>
                <div className="col-lg-4">
                    <Field
                        name="portCount"
                        component={Input}
                        placeholder={port}
                        label={port}
                    />
                </div>
                 <div className="col-lg-4">
                    <Field
                        name="apartmentCount"
                        component={Input}
                        placeholder={apartment}
                        label={apartment}
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                    <Select name="ownerId" label={owner}>
                        <option value=""></option>
                            {allOwners  && allOwners.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                    <Select name="salesUserId" label={sale}>
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="col-lg-4">
                     <Select name="techUserId" label={tech}>
                        <option value=""></option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Select>
                </div>
                          </div>
                <div className="form-group row">
                    <div className="col-lg-4">
                    <Select name="areaType" label={a_type}>
                        {ProjectAreaTitles.map((status, index) => (
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
