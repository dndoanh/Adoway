import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProjectsFilter } from "./projects-filter/ProjectsFilter";
import { ProjectsTable } from "./projects-table/ProjectsTable";
import { useProjectsUIContext } from "./ProjectsUIContext";

export function ProjectsCard() {
  const projectsUIContext = useProjectsUIContext();
  const projectsUIProps = useMemo(() => {
    return {
      newProjectButtonClick: projectsUIContext.newProjectButtonClick,
    };
  }, [projectsUIContext]);

  return (
    <Card>
      <CardHeader title="Projects list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={projectsUIProps.newProjectButtonClick}
          >
            New Work Order
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProjectsFilter />
        <ProjectsTable />
      </CardBody>
    </Card>
  );
}
