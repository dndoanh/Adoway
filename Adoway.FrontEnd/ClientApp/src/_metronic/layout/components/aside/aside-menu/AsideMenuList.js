/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu &&
            "menu-item-active"} menu-item-open menu-item-not-hightlighted`
            : "";
    };

    return (
        <>
            {/* begin::Menu Nav */}
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/dashboard">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
                        </span>
                        <span className="menu-text">Dashboard</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}
                <li className="menu-section ">
                    <h4 className="menu-text">Human Resource Management</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}
                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/departments", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/departments">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Departments</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/employees", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/employees">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Employees</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}
                {/* Project Management */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">Project Management</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}
                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/apartments", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/apartments">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Apartments</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/contracts", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/contracts">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Contracts</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/owners", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/owners">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Owners</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/televendors", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/televendors">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">TeleVendors</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/workorders", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/workorders">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Work Orders</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/projects", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/projects">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Projects</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}

                {/* Owner Management */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">Owner Management</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}     
                <li
                    className={`menu-item ${getMenuItemActive("/owners", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/owners">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Owner.svg")} />
                        </span>
                        <span className="menu-text">Owners</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/roles", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/roles">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Shield-protected.svg")} />
                        </span>
                        <span className="menu-text">Roles</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}

                {/* System */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">Systems</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}
                <li
                    className={`menu-item ${getMenuItemActive("/enterprises", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/enterprises">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Route.svg")} />
                        </span>
                        <span className="menu-text">Enterprises</span>
                    </NavLink>
                </li>
                <li
                    className={`menu-item ${getMenuItemActive("/languages", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/languages">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
                        </span>
                        <span className="menu-text">Languages</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}

                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/settings", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/settings">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")} />
                        </span>
                        <span className="menu-text">Settings</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}
            </ul>

            {/* end::Menu Nav */}
        </>
    );
}
