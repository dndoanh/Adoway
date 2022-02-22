// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/languages/languagesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../LanguagesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useLanguagesUIContext } from "../LanguagesUIContext";
import { FormattedMessage, useIntl } from 'react-intl';

export function LanguagesTable() {
  // Languages UI Context
  const languagesUIContext = useLanguagesUIContext();
  const languagesUIProps = useMemo(() => {
    return {
      queryParams: languagesUIContext.queryParams,
      setQueryParams: languagesUIContext.setQueryParams,
      openEditLanguageDialog: languagesUIContext.openEditLanguageDialog,
      openDeleteLanguageDialog: languagesUIContext.openDeleteLanguageDialog,
    };
  }, [languagesUIContext]);

  // Getting curret state of languages list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.languages }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Languages Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchLanguages(languagesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languagesUIProps.queryParams, dispatch]);
  // Table columns

    const intl = useIntl()
    const name = intl.formatMessage({ id: "TITLE.NAME" })
    const status = intl.formatMessage({ id: "TITLE.STATUS" })
    const action = intl.formatMessage({ id: "TITLE.ACTION" })
    const IsDefault = intl.formatMessage({ id: "TITLE.ISDEFAULT" })
  const columns = [
        {
            dataField: "name",
            text: name,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "locale",
            text: "Locale",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
      {
          dataField: "isDefault",
          text: IsDefault,
          sort: false,
          sortCaret: sortCaret,
          formatter: columnFormatters.DefaultColumnFormatter,
          headerSortingClasses,
      },
      {
      dataField: "status",
      text:  status,
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
       text: action,
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLanguageDialog: languagesUIProps.openEditLanguageDialog,
        openDeleteLanguageDialog: languagesUIProps.openDeleteLanguageDialog,
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
    sizePerPage: languagesUIProps.queryParams.pageSize,
    page: languagesUIProps.queryParams.pageNumber,
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
                  languagesUIProps.setQueryParams
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
