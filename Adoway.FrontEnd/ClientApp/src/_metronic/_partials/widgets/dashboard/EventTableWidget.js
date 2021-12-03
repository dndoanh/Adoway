/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";

export function EventTableWidget({ className,events }) {
  const tabs = {
    tab1: "kt_tab_pane_3_1",
    tab2: "kt_tab_pane_3_2",
    tab3: "kt_tab_pane_3_3",
  };
  const [activeTab, setActiveTab] = useState(tabs.tab1);

  return (
    <>
      {/* begin::Base Table Widget 6 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Upcoming Events
            </span>
          </h3>
          <div className="card-toolbar">
            <ul className="nav nav-pills nav-pills-sm nav-dark-75">
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab1 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab1}`}
                  onClick={() => setActiveTab(tabs.tab1)}
                >
                  Month
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab2 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab2}`}
                  onClick={() => setActiveTab(tabs.tab2)}
                >
                  Week
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab3 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab3}`}
                  onClick={() => setActiveTab(tabs.tab3)}
                >
                  Day
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-2 pb-0">
          {/* begin::Table */}
          <div className="table-responsive">
            <table className="table table-borderless table-vertical-center">
              <thead>
                <tr>
                  <th className="p-0" style={{ width: "50px" }} />
                  <th className="p-0" style={{ minWidth: "150px" }} />
                  <th className="p-0" style={{ minWidth: "120px" }} />
                  <th className="p-0" style={{ minWidth: "70px" }} />
                  <th className="p-0" style={{ minWidth: "70px" }} />
                  <th className="p-0" style={{ minWidth: "50px" }} />
                </tr>
              </thead>
                <tbody>
                {
                    events && events.map(e => (
                        <>
                            <tr>
                                <td className="pl-0">
                                    <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                                        <span className="symbol-label">
                                           
                                        </span>
                                    </div>
                                </td>
                                <td className="pl-0">
                                    <a
                                        href="#"
                                        className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                    >
                                        {e.title}
                                    </a>
                                  
                                </td>
                                <td></td>
                                <td className="text-right">
                                    <span className="text-muted font-weight-bold d-block font-size-sm">
                                        {e.startDate}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <span className="font-weight-bolder text-primary">
                                        {e.endDate}
                                    </span>
                                </td>
                                <td className="text-right pr-0">
                                    <a href="#" className="btn btn-icon btn-light btn-sm">
                                        <span className="svg-icon svg-icon-md svg-icon-success">
                                            <SVG
                                                src={toAbsoluteUrl(
                                                    "/media/svg/icons/Navigation/Arrow-right.svg"
                                                )}
                                            ></SVG>
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        </>
                    ))
                }
           
             
              </tbody>
            </table>
          </div>
          {/* end::Table */}
        </div>
        {/* end::Body */}
      </div>
      {/* end::Base Table Widget 6 */}
    </>
  );
}
