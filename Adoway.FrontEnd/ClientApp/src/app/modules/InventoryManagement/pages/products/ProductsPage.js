import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductEditDialog } from "./product-edit-dialog/ProductEditDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsUIProvider } from "./ProductsUIContext";
import { ProductsCard } from "./ProductsCard";

export function ProductsPage({ history }) {
    const productsUIEvents = {
        newProductButtonClick: () => {
            history.push("/products/new");
        },
        newProductInRolesButtonClick: () => {
            history.push("/products/new-product-in-roles");
        },
        openEditProductDialog: (id) => {
            history.push(`/products/${id}/edit`);
        },
        openEditProductInRoleDialog: (id) => {
            history.push(`/products/${id}/edit-role`);
        },
        openDeleteProductDialog: (id) => {
            history.push(`/products/${id}/delete`);
        },
        openDeleteProductInRolesDialog: (id) => {
            history.push(`/products/${id}/delete-product-in-roles`);
        }
    }

    return (
        <ProductsUIProvider productsUIEvents={productsUIEvents}>
            <ProductsLoadingDialog />
            <Route path="/products/new">
                {({ history, match }) => (
                    <ProductEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/products");
                        }}
                    />
                )}
            </Route>
            <Route path="/products/:id/edit">
                {({ history, match }) => (
                    <ProductEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/products");
                        }}
                    />
                )}
            </Route>
            <Route path="/products/:id/delete">
                {({ history, match }) => (
                    <ProductDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/products");
                        }}
                    />
                )}
            </Route>
            <ProductsCard />
        </ProductsUIProvider>
    );
}
