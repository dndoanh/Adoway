// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import * as usersActions from "../../../../UserManagement/_redux/users/usersActions";
//import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
//import * as apartmentsActions from "../../../../ProductManagement/_redux/apartments/apartmentsActions";
import * as ownersActions from "../../../../ProjectManagement/_redux/owners/ownersActions";
import * as categoriesActions from "../../../../InventoryManagement/_redux/categories/categoriesActions";
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ProductsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";

export function ProductsTable() {
    // Products UI Context
    const productsUIContext = useProductsUIContext();
    const productsUIProps = useMemo(() => {
        return {
            queryParams: productsUIContext.queryParams,
            setQueryParams: productsUIContext.setQueryParams,
            openEditProductPage: productsUIContext.openEditProductPage,
            openDeleteProductDialog: productsUIContext.openDeleteProductDialog
        };
    }, [productsUIContext]);

    // Getting curret state of products list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.products }),
        shallowEqual
    );
  
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Products Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchProducts(productsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    useEffect(() => {
        // server call by queryParams
        dispatch(usersActions.fetchAllUsers);
        dispatch(categoriesActions.fetchAllCategories);
        //dispatch(apartmentsActions.fetchApartments({ filter: { name: "" }, sortOrder: "asc", sortField: "name", pageNumber: 1, pageSize: 10 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "name",
            text: "Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "categoryName",
            text: "Category Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "salesPrice",
            text: "Sales Price",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "measureUnit",
            text: "Measure Unit",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatters.StatusColumnFormatter,
            headerSortingClasses,
        },

        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditProductPage: productsUIProps.openEditProductPage,
                openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
                Delete: user.isSuperAdmin || Delete,
                Edit: user.isSuperAdmin || Edit
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];
    // Table pagination properties
    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: uiHelpers.sizePerPageList,
        sizePerPage: productsUIProps.queryParams.pageSize,
        page: productsUIProps.queryParams.pageNumber,
    };
    return (
        <>
            <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                {({ paginationProps, paginationTableProps }) => {
                    return (
                        <Pagination
                            isLoading={listLoading}
                            paginationProps={paginationProps}
                        >
                            <BootstrapTable
                                wrapperClasses="table-responsive"
                                bordered={false}
                                classes="table table-head-custom table-vertical-center overflow-hidden"
                                bootstrap4
                                remote
                                keyField="id"
                                data={entities === null ? [] : entities}
                                columns={columns}
                                defaultSorted={uiHelpers.defaultSorted}
                                onTableChange={getHandlerTableChange(
                                    productsUIProps.setQueryParams
                                )}
                                {...paginationTableProps}
                            >
                                <PleaseWaitMessage entities={entities} />
                                <NoRecordsFoundMessage entities={entities} />
                            </BootstrapTable>
                        </Pagination>
                    );
                }}
            </PaginationProvider>
        </>
    );
}
