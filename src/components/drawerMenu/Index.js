import React, { useState } from 'react'
import './style.scss'
import arrow from './chevron-right.svg'
import { NavLink } from 'react-router-dom'

// Menu Item
const MenuItem = props => {
    const [open, setOpen] = useState(false)

    return (
        <div className="sub-menu-container">

            {props.path ?

                // if item place into drawer & item path available 
                <NavLink
                    to={props.path}
                    exact={props.exact}
                    type="button"
                    activeClassName="isActive"
                    className="btn shadow-none menu-btn"
                >
                    <span className="menu-icon">{props.icon}</span>
                    <span className="menu-title">{props.title}</span>
                </NavLink>
                :

                // if children available create sub menu
                <div
                    className="sub-menu d-flex"
                    onClick={() => setOpen(!open)}
                >
                    <div className="menu-icon">{props.icon}</div>
                    <div className="menu-title">{props.title}</div>
                    {props.child ?
                        <div className="menu-arrow ms-auto">
                            <img
                                src={arrow}
                                width={14}
                                height={14}
                                className={open ? "arrow down" : "arrow"}
                                alt="Right arrow"
                            />
                        </div>
                        : null
                    }
                </div>
            }

            {/* Recursion menu items */}
            <div className={open ? "sub-menu-body show" : "sub-menu-body"}>
                {props.child && props.child.map((item, i) =>
                    item.inDrawer ?
                        <MenuItem
                            key={i}
                            icon={item.icon}
                            path={item.path}
                            title={item.title}
                            exact={item.exact ? item.exact : false}
                            child={item.child}
                        />
                        : null
                )}
            </div>
        </div>
    )
}

const TreeMenu = (props) => {
    return (
        <div>
            {props.routes && props.routes.length ?
                props.routes.map((item, i) => {
                    if (item.inDrawer) {
                        return (
                            <MenuItem
                                key={i}
                                icon={item.icon}
                                path={item.path}
                                title={item.title}
                                exact={item.exact ? item.exact : false}
                                child={item.child}
                            />
                        )
                    } else {
                        return null
                    }
                })
                : null}
        </div>
    )
}

export { MenuItem, TreeMenu };