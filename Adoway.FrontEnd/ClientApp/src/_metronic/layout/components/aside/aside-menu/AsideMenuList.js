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

                {/* Project Management */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">Project Management</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}
                {/*begin::1 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/projects", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/projects">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
                        </span>
                        <span className="menu-text">Projects</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}

                {/* User Management */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">User Management</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
                {/* end:: section */}
                {/*begin::1 Level - Users*/}
                <li
                    className={`menu-item ${getMenuItemActive("/users", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/users">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
                        </span>
                        <span className="menu-text">Users</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}
                {/*begin::1 Level - Roles*/}
                <li
                    className={`menu-item ${getMenuItemActive("/roles", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/roles">
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
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
