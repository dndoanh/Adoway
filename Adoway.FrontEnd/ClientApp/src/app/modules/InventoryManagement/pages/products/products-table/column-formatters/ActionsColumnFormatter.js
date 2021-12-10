// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FormattedMessage, useIntl } from 'react-intl';
export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
    { openEditProductPage, openDeleteProductDialog,Edit,Delete }
) {
    const intl = useIntl()
    const deleteTitle = intl.formatMessage({ id: "INVENTORY.PRODUCTS.DETELE_PRODUCT" })
    const editTitle = intl.formatMessage({ id: "INVENTORY.PRODUCTS.EDIT_PRODUCT" })
  return (
      <>
          {
              Edit &&
              <OverlayTrigger
                  overlay={<Tooltip id="projects-edit-tooltip">{editTitle}</Tooltip>}
              >
                  <a
                      className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                      onClick={() => openEditProductPage(row.id)}
                  >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                          />
                      </span>
                  </a>
              </OverlayTrigger>
          }
          {
              Delete &&
              <a
                  title={deleteTitle}
                  className="btn btn-icon btn-light btn-hover-danger btn-sm"
                  onClick={() => openDeleteProductDialog(row.id)}
              >
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                  </span>
              </a>
          }
    </>
  );
}
