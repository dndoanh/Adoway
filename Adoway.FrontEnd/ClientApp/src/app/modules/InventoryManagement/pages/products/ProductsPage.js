import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsUIProvider } from "./ProductsUIContext";
import { ProductsCard } from "./ProductsCard";
import { ProductEdit } from "./product-edit/ProductEdit";
import { ContentRoute } from "../../../../../_metronic/layout";

export function ProductsPage({ history }) {
    const productsUIEvents = {
        newProductButtonClick: () => {
            history.push("/products/new");
        },
        openEditProductPage: (id) => {
            history.push(`/products/${id}/edit`);
        },
        openDeleteProductDialog: (id) => {
            history.push(`/products/${id}/delete`);
        }
    }
    return (
        <ProductsUIProvider productsUIEvents={productsUIEvents}>
            <ProductsLoadingDialog />
            <ContentRoute path="/products/new" component={ProductEdit} />
            <ContentRoute
                path="/products/:id/edit"
                component={ProductEdit}
            />
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
