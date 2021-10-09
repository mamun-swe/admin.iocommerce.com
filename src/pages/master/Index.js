import React, { useState, useEffect } from 'react'
import './style.scss'
import jwtDecode from 'jwt-decode'
import { Switch, Route } from 'react-router-dom'
import { routes } from '../../routes/Index'

import Navbar from '../../components/navbar/Index'
import Drawer from '../../components/drawer/Index'

// --- 404 ---
import FourOFour from '../404/Index'

const Index = () => {
    const [open, setOpen] = useState(false)
    const [permitted, setPermitted] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decode = jwtDecode(token)
            const permissions = decode.permissions

            // Filter permitted routes from given permissions
            if (routes && routes.length) {
                const isAll = permissions.find(item => item === "all")

                if (isAll) {
                    return setPermitted(routes)
                } else {
                    const permittedRoutes = routes.filter(({ name: routeName }) => permissions.some(x => x === routeName))
                    setPermitted(permittedRoutes)
                }
            }
        }
    }, [])

    return (
        <div className="master">
            <Navbar menu={true} drawer={() => setOpen(true)} />
            <Drawer routes={permitted} show={open} onHide={() => setOpen(false)} />

            <div className="main">
                <Switch>

                    {permitted && permitted.map((item, i) =>
                        item.name && item.path ?
                            <Route
                                key={i}
                                exact={item.exact}
                                path={item.path}
                                component={item.component}
                            />
                            : item.child && item.child.length ? item.child.map((child, j) =>
                                <Route
                                    key={j}
                                    exact={child.exact}
                                    path={child.path}
                                    component={child.component}
                                />
                            ) : null)
                    }

                    <Route path="*" component={FourOFour} />

                </Switch>
            </div>
        </div>
    )
}

export default Index;