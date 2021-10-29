import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/projects/projectsActions";
import { ProjectEditDialogHeader } from "./ProjectEditDialogHeader";
import { ProjectEditForm } from "./ProjectEditForm";
import { useProjectsUIContext } from "../ProjectsUIContext";

export function ProjectEditDialog({ id, show, onHide }) {
  // Projects UI Context
  const projectsUIContext = useProjectsUIContext();
  const projectsUIProps = useMemo(() => {
    return {
      initProject: projectsUIContext.initProject,
    };
  }, [projectsUIContext]);

  // Projects Redux state
  const dispatch = useDispatch();
  const { actionsLoading, projectForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.projects.actionsLoading,
      projectForEdit: state.projects.projectForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Project by id
    dispatch(actions.selectProject(id));
  }, [id, dispatch]);

  // server request for saving project
  const saveProject = (project) => {
    if (!id) {
      // server request for creating project
      dispatch(actions.createProject(project)).then(() => onHide());
    } else {
      // server request for updating project
      dispatch(actions.updateProject(project)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProjectEditDialogHeader id={id} />
      <ProjectEditForm
        saveProject={saveProject}
        actionsLoading={actionsLoading}
        project={projectForEdit || projectsUIProps.initProject}
        onHide={onHide}
      />
    </Modal>
  );
}
