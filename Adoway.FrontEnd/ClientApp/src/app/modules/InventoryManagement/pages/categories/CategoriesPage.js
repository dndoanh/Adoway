import React from "react";
import { Route } from "react-router-dom";
import { CategoriesLoadingDialog } from "./categories-loading-dialog/CategoriesLoadingDialog";
import { CategoryEditDialog } from "./category-edit-dialog/CategoryEditDialog";
import { CategoryDeleteDialog } from "./category-delete-dialog/CategoryDeleteDialog";
import { CategoriesUIProvider } from "./CategoriesUIContext";
import { CategoriesCard } from "./CategoriesCard";

export function CategoriesPage({ history }) {
    const categoriesUIEvents = {
        newCategoryButtonClick: () => {
            history.push("/categories/new");
        },
        newCategoryInRolesButtonClick: () => {
            history.push("/categories/new-category-in-roles");
        },
        openEditCategoryDialog: (id) => {
            history.push(`/categories/${id}/edit`);
        },
        openEditCategoryInRoleDialog: (id) => {
            history.push(`/categories/${id}/edit-role`);
        },
        openDeleteCategoryDialog: (id) => {
            history.push(`/categories/${id}/delete`);
        },
        openDeleteCategoryInRolesDialog: (id) => {
            history.push(`/categories/${id}/delete-category-in-roles`);
        }
    }

    return (
        <CategoriesUIProvider categoriesUIEvents={categoriesUIEvents}>
            <CategoriesLoadingDialog />
            <Route path="/categories/new">
                {({ history, match }) => (
                    <CategoryEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/categories");
                        }}
                    />
                )}
            </Route>
            <Route path="/categories/:id/edit">
                {({ history, match }) => (
                    <CategoryEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/categories");
                        }}
                    />
                )}
            </Route>
            <Route path="/categories/:id/delete">
                {({ history, match }) => (
                    <CategoryDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/categories");
                        }}
                    />
                )}
            </Route>
            <CategoriesCard />
        </CategoriesUIProvider>
    );
}
