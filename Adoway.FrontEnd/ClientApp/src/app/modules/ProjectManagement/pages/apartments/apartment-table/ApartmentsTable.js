// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/apartments/apartmentsActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import * as projectsActions from "../../../../ProjectManagement/_redux/projects/projectsActions";
import * as customersActions from "../../../../SalesManagement/_redux/customers/customersActions";
import { FormattedMessage, useIntl } from 'react-intl';
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ApartmentsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useApartmentsUIContext } from "../ApartmentsUIContext";

export function ApartmentsTable() {
    // Apartments UI Context
    const apartmentsUIContext = useApartmentsUIContext();
    const apartmentsUIProps = useMemo(() => {
        return {
            queryParams: apartmentsUIContext.queryParams,
            setQueryParams: apartmentsUIContext.setQueryParams,
            openEditApartmentDialog: apartmentsUIContext.openEditApartmentDialog,
            openEditApartmentInRoleDialog: apartmentsUIContext.openEditApartmentInRoleDialog,
            openDeleteApartmentDialog: apartmentsUIContext.openDeleteApartmentDialog
        };
    }, [apartmentsUIContext]);

    // Getting curret state of apartments list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.apartments }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Apartments Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchApartments(apartmentsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apartmentsUIProps.queryParams, dispatch, needReload]);

    // get all languages for upper item
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
    const Delete = user.functions.find(x => x.code == "DeleteSupplier")
    const Edit = user.functions.find(x => x.code == "EditSupplier")

    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const floor = intl.formatMessage({ id: "PROJECT.APARTMENT.FLOOR" })
    const block = intl.formatMessage({ id: "PROJECT.APARTMENT.BLOCK" })
    const intenet = intl.formatMessage({ id: "PROJECT.APARTMENT.INTERNET_LINE" })
    const tv = intl.formatMessage({ id: "PROJECT.APARTMENT.TV_LINE" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })

    useEffect(() => {
        // server call by queryParams
        dispatch(projectsActions.fetchAllProjects);
        dispatch(customersActions.fetchAllCustomers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Table columns
    const columns = [
        {
            dataField: "name",
            text: name,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "floor",
            text: floor,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "block",
            text: block,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "internetLine",
            text: intenet,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "tvLine",
            text: tv,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: action,
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openEditApartmentDialog: apartmentsUIProps.openEditApartmentDialog,
                openEditApartmentInRoleDialog: apartmentsUIProps.openEditApartmentInRoleDialog,
                openDeleteApartmentDialog: apartmentsUIProps.openDeleteApartmentDialog,
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
        sizePerPage: apartmentsUIProps.queryParams.pageSize,
        page: apartmentsUIProps.queryParams.pageNumber,
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
                                apartmentsUIProps.setQueryParams
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
