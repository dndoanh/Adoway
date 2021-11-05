import React from "react";
import { Route } from "react-router-dom";
import { ProjectsLoadingDialog } from "./projects-loading-dialog/ProjectsLoadingDialog";
import { ProjectDeleteDialog } from "./project-delete-dialog/ProjectDeleteDialog";
import { ProjectsUIProvider } from "./ProjectsUIContext";
import { ProjectsCard } from "./ProjectsCard";
import { ProjectEdit } from "./project-edit/ProjectEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function ProjectsPage({ history }) {
    const projectsUIEvents = {
        newProjectButtonClick: () => {
            history.push("/projects/new");
        },
        openEditProjectPage: (id) => {
            history.push(`/projects/${id}/edit`);
        },
        openDeleteProjectDialog: (id) => {
            history.push(`/projects/${id}/delete`);
        },
       
    }

    return (
        <ProjectsUIProvider projectsUIEvents={projectsUIEvents}>
            <ProjectsLoadingDialog />
            <ContentRoute path="/projects/new" component={ProjectEdit} />
            <ContentRoute
                path="/projects/:id/edit"
                component={ProjectEdit}
            />
            <Route path="/projects/:id/delete">
                {({ history, match }) => (
                    <ProjectDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/projects");
                        }}
                    />
                )}
            </Route>
            <ProjectsCard />
        </ProjectsUIProvider>
    );
}
