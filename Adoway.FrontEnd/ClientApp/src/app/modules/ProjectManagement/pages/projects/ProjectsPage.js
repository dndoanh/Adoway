import React from "react";
import { Route } from "react-router-dom";
import { ProjectsLoadingDialog } from "./projects-loading-dialog/ProjectsLoadingDialog";
import { ProjectEditDialog } from "./project-edit-dialog/ProjectEditDialog";
import { ProjectDeleteDialog } from "./project-delete-dialog/ProjectDeleteDialog";
import { ProjectsUIProvider } from "./ProjectsUIContext";
import { ProjectsCard } from "./ProjectsCard";

export function ProjectsPage({ history }) {
    const projectsUIEvents = {
        newProjectButtonClick: () => {
            history.push("/projects/new");
        },
        newProjectInRolesButtonClick: () => {
            history.push("/projects/new-project-in-roles");
        },
        openEditProjectDialog: (id) => {
            history.push(`/projects/${id}/edit`);
        },
        openEditProjectInRoleDialog: (id) => {
            history.push(`/projects/${id}/edit-role`);
        },
        openDeleteProjectDialog: (id) => {
            history.push(`/projects/${id}/delete`);
        },
        openDeleteProjectInRolesDialog: (id) => {
            history.push(`/projects/${id}/delete-project-in-roles`);
        }
    }

    return (
        <ProjectsUIProvider projectsUIEvents={projectsUIEvents}>
            <ProjectsLoadingDialog />
            <Route path="/projects/new">
                {({ history, match }) => (
                    <ProjectEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/projects");
                        }}
                    />
                )}
            </Route>
            <Route path="/projects/:id/edit">
                {({ history, match }) => (
                    <ProjectEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/projects");
                        }}
                    />
                )}
            </Route>
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
