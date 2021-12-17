// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/contracts/contractsActions";
import * as languagesActions from "../../../../System/_redux/languages/languagesActions";
import { FormattedMessage, useIntl } from 'react-intl';
import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ContractsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useContractsUIContext } from "../ContractsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export function ContractsTable() {
    // Contracts UI Context
    const contractsUIContext = useContractsUIContext();
    const contractsUIProps = useMemo(() => {
        return {
            queryParams: contractsUIContext.queryParams,
            setQueryParams: contractsUIContext.setQueryParams,
            openEditContractDialog: contractsUIContext.openEditContractDialog,
            openEditContractInRoleDialog: contractsUIContext.openEditContractInRoleDialog,
            openDeleteContractDialog: contractsUIContext.openDeleteContractDialog
        };
    }, [contractsUIContext]);

    // Getting curret state of contracts list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.contracts }),
        shallowEqual
    );
    const { totalCount, entities, listLoading, needReload } = currentState;

    // Contracts Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchContracts(contractsUIProps.queryParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contractsUIProps.queryParams, dispatch, needReload]);

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
        dispatch(languagesActions.fetchAllLanguages);
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
            dataField: "TV Line",
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
                openEditContractDialog: contractsUIProps.openEditContractDialog,
                openEditContractInRoleDialog: contractsUIProps.openEditContractInRoleDialog,
                openDeleteContractDialog: contractsUIProps.openDeleteContractDialog,
                Delete: Delete,
                Edit: Edit
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
        sizePerPage: contractsUIProps.queryParams.pageSize,
        page: contractsUIProps.queryParams.pageNumber,
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
                                    contractsUIProps.setQueryParams
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
