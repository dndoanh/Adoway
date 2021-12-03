/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { shallowEqual, useSelector } from "react-redux";

export function AsideMenuList({ layoutProps }) {
    const location = useLocation();
    const user = useSelector(({ auth }) => auth.user, shallowEqual);
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
                {user.screens && user.screens.map(u => (
                    <>
                        {
                            u.isUpper ?
                                <li className="menu-section "> 
                                    <h4 className="menu-text">{u.name}</h4>
                                </li> :
                                <li
                                    className={`menu-item ${getMenuItemActive(u.path, false)}`}
                                    aria-haspopup="true"
                                >
                                    <NavLink className="menu-link" to={`${u.path}`}>
                                        <span className="svg-icon menu-icon">
                                            <SVG src={toAbsoluteUrl(u.icon)} />
                                        </span>
                                        <span className="menu-text">{u.name}</span>
                                    </NavLink>
                                </li>
                        }
                    </>
                   ))
                }
                {user.isSuperAdmin && (
                    <>
                        <li className="menu-section ">
                            <h4 className="menu-text">User Management</h4>
                            <i className="menu-icon flaticon-more-v2"></i>
                        </li>
                        <li
                            className={`menu-item ${getMenuItemActive("/users", false)}`}
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link" to="/users">
                                <span className="svg-icon menu-icon">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
                                </span>
                                <span className="menu-text">User</span>
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
                    </>
                    )
                }
            </ul>
        </>
    );
}
