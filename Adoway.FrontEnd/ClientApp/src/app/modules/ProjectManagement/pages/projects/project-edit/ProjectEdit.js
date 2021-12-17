/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/projects/projectsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ProjectEditForm } from "./ProjectEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { FormattedMessage, useIntl } from 'react-intl';
const initProject = {
  id: undefined,
  code: "",
    projectId: null
};

export function ProjectEdit({
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
    const { actionsLoading, projectForEdit } = useSelector(
    (state) => ({
          actionsLoading: state.projects.actionsLoading,
          projectForEdit: state.projects.projectForEdit,
    }),
    shallowEqual
  );

    useEffect(() => {
        dispatch(actions.selectProject(id));
  }, [id, dispatch]);

    const intl = useIntl()
    const n_project = intl.formatMessage({ id: "PROJECT.NEW_PROJECT" })
    const e_project = intl.formatMessage({ id: "PROJECT.EDIT_PROJECT" })

    useEffect(() => {
        let _title = id ? "" : n_project;
    if (projectForEdit && id) {
        _title = e_project;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectForEdit, id]);

    const saveProject = (values) => {
        if (!id) {
          dispatch(actions.createProject(values)).then(() => backToProjectsList());
        } else {
          dispatch(actions.updateProject(values)).then(() => backToProjectsList());
        }
    };

  const btnRef = useRef();  
  const saveProjectClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProjectsList = () => {
    history.push(`/projects`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProjectsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            <FormattedMessage
                id="COMMON.BACK"
            />
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            <FormattedMessage
                id="COMMON.RESET"
            />
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProjectClick}
          >
             <FormattedMessage
                id="COMMON.SAVE"
            />
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
                  Project remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  Project specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <ProjectEditForm
              actionsLoading={actionsLoading}
              project={projectForEdit || initProject}
              btnRef={btnRef}
              saveProject={saveProject}
            />
          )}
          {/*{tab === "remarks" && id && (*/}
          {/*  <RemarksUIProvider currentProjectId={id}>*/}
          {/*    <Remarks />*/}
          {/*  </RemarksUIProvider>*/}
          {/*)}*/}
          {/*{tab === "specs" && id && (*/}
          {/*  <SpecificationsUIProvider currentProjectId={id}>*/}
          {/*    <Specifications />*/}
          {/*  </SpecificationsUIProvider>*/}
          {/*)}*/}
        </div>
      </CardBody>
    </Card>
  );
}
